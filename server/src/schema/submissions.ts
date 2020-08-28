import { gql } from "apollo-server-express";
import { IMutationAddSubmissionArgs } from "../graphql-types";
import { Submission } from "../db/models/Submission";
import { Person } from "../db/models/Person";

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
};
