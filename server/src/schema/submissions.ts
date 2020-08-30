import { gql } from "apollo-server-express";
import {
  IMutationAddSubmissionArgs,
  IQuerySubmissionsArgs,
} from "../graphql-types";
import { Submission } from "../db/models/Submission";
import { Person } from "../db/models/Person";
import { MyContext } from "../my-types";
import { Survey } from "../db/models/Survey";

export const typeDef = gql`
  input PersonInput {
    firstName: String!
    lastName: String!
    email: String!
  }

  input SubmissionInput {
    questionId: ID!
    answerId: ID
    answerText: String!
  }

  extend type Query {
    submissions(surveyId: ID!): [Submission!]!
  }

  extend type Mutation {
    addSubmission(
      person: PersonInput!
      submission: [SubmissionInput!]!
      surveyId: String!
    ): Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    addSubmission: async (
      _: any,
      {
        submission,
        person: { firstName, lastName, email },
        surveyId,
      }: IMutationAddSubmissionArgs
    ): Promise<Boolean> => {
      const person = await Person.query()
        .insert({
          firstName,
          lastName,
          email,
        })
        .returning("id");

      const data = submission.map((submission) => ({
        questionId: submission.questionId,
        answerId: submission.answerId,
        answerText: submission.answerText,
        personId: person.id,
        surveyId,
      }));

      await Submission.query().insert(data);

      return true;
    },
  },
  Query: {
    submissions: async (
      _: any,
      { surveyId }: IQuerySubmissionsArgs,
      { user: { id: userId } }: MyContext
    ) => {
      const survey = await Survey.query().findOne({
        id: surveyId,
        userId,
      });

      return Submission.query()
        .where({
          surveyId: survey.id,
        })
        .withGraphFetched({
          person: true,
          question: true,
          answer: true,
        });
    },
  },
};
