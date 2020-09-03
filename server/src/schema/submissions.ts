import { gql } from "apollo-server-express";
import {
  IMutationAddSubmissionArgs,
  IQuerySubmissionsArgs,
} from "../graphql-types";
import { Submission } from "../db/models/Submission";
import { Person } from "../db/models/Person";
import { MyContext } from "../my-types";
import { Survey } from "../db/models/Survey";
import joi from "@hapi/joi";

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
    submissions(surveyId: ID!, offset: Int!): [Submission!]!
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
      try {
        await joi
          .object({
            submission: joi.array().items(
              joi.object({
                questionId: joi.string().required(),
                answerId: joi.string().required().allow(null),
                answerText: joi.string().required(),
              })
            ),
            person: joi.object({
              firstName: joi.string().required(),
              lastName: joi.string().required(),
              email: joi.string().required(),
            }),
            surveyId: joi.string().required(),
          })
          .validateAsync({
            submission,
            person: {
              firstName,
              lastName,
              email,
            },
            surveyId,
          });
      } catch (error) {
        throw error;
      }

      const person = await Person.query()
        .insert({
          firstName,
          lastName,
          email,
          surveyId,
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
      { surveyId, offset }: IQuerySubmissionsArgs,
      { user: { id: userId } }: MyContext
    ) => {
      const survey = await Survey.query()
        .findOne({
          id: surveyId,
          userId,
        })
        .returning("id");

      const persons = await Person.query()
        .limit(5)
        .offset(offset)
        .where("surveyId", survey.id)
        .orderBy("createdAt", "asc");

      return Submission.query()
        .whereIn(
          "personId",
          persons.map(({ id }) => id)
        )
        .andWhere({
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
