import { gql } from "apollo-server-express";
import {
  IMutationCreateQuestionArgs,
  IMutationDeleteQuestionArgs,
  IQueryQuestionArgs,
  IMutationUpdateQuestionArgs,
} from "../graphql-types";
import { MyContext } from "../my-types";
import { Question } from "../db/models/Question";
import { Survey } from "../db/models/Survey";

export const typeDef = gql`
  extend type Query {
    question(id: ID!): Question!
  }

  extend type Mutation {
    createQuestion(surveyId: ID!): Question!
    deleteQuestion(id: ID!, surveyId: ID!): Boolean!
    updateQuestion(id: ID!, surveyId: ID!, text: String!): Question!
  }
`;

export const resolvers = {
  Query: {
    question: async (_: any, { id }: IQueryQuestionArgs): Promise<Question> => {
      return Question.query().findById(id);
    },
  },
  Mutation: {
    createQuestion: async (
      _: any,
      { surveyId }: IMutationCreateQuestionArgs,
      { user: { id: userId } }: MyContext
    ): Promise<Question> => {
      const survey = await Survey.query().findOne({
        id: surveyId,
        userId,
      });

      return survey
        .$relatedQuery("questions")
        .insert({
          text: "New Question",
        })
        .returning("*")
        .first();
    },
    deleteQuestion: async (
      _: any,
      { id, surveyId }: IMutationDeleteQuestionArgs,
      { user: { id: userId } }: MyContext
    ) => {
      try {
        const survey = await Survey.query().findOne({
          userId,
          id: surveyId,
        });
        await survey
          .$relatedQuery("questions")
          .deleteById(id)
          .throwIfNotFound();
        return true;
      } catch {
        return false;
      }
    },
    updateQuestion: async (
      _: any,
      { id, surveyId, text }: IMutationUpdateQuestionArgs,
      { user: { id: userId } }: MyContext
    ): Promise<Question> => {
      const survey = await Survey.query().findOne({
        userId,
        id: surveyId,
      });
      return survey
        .$relatedQuery("questions")
        .update({
          text,
        })
        .where({ id })
        .returning("*")
        .first();
    },
  },
};
