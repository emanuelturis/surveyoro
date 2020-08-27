import { gql } from "apollo-server-express";
import {
  IMutationCreateAnswerArgs,
  IMutationUpdateAnswerArgs,
  IMutationDeleteAnswerArgs,
} from "../graphql-types";
import { MyContext } from "../my-types";
import { Survey } from "../db/models/Survey";
import { Answer } from "../db/models/Answer";

export const typeDef = gql`
  extend type Mutation {
    createAnswer(questionId: ID!, surveyId: ID!): Answer!
    updateAnswer(
      id: ID!
      questionId: ID!
      surveyId: ID!
      text: String!
    ): Answer!
    deleteAnswer(id: ID!, questionId: ID!, surveyId: ID!): Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    createAnswer: async (
      _: any,
      { questionId, surveyId }: IMutationCreateAnswerArgs,
      { user: { id: userId } }: MyContext
    ) => {
      const survey = await Survey.query().findOne({
        userId,
        id: surveyId,
      });

      const question = await survey.$relatedQuery("questions").findOne({
        id: questionId,
      });

      return await Answer.query()
        .insert({
          text: "New Answer",
          questionId: question.id,
        })
        .returning("*");
    },
    updateAnswer: async (
      _: any,
      { id, questionId, surveyId, text }: IMutationUpdateAnswerArgs,
      { user: { id: userId } }: MyContext
    ): Promise<Answer> => {
      try {
        const survey = await Survey.query().findOne({
          userId,
          id: surveyId,
        });

        await survey.$relatedQuery("questions").findOne({
          id: questionId,
        });

        return Answer.query()
          .update({
            text,
          })
          .where({
            id,
            questionId,
          })
          .returning("*")
          .first();
      } catch (error) {
        throw error;
      }
    },
    deleteAnswer: async (
      _: any,
      { id, surveyId, questionId }: IMutationDeleteAnswerArgs,
      { user: { id: userId } }: MyContext
    ): Promise<Boolean> => {
      try {
        const survey = await Survey.query().findOne({
          userId,
          id: surveyId,
        });

        await survey.$relatedQuery("questions").findOne({
          id: questionId,
        });

        await Answer.query().delete().where({
          id,
          questionId,
        });

        return true;
      } catch (error) {
        throw error;
      }
    },
  },
};
