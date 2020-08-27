import { gql } from "apollo-server-express";
import {
  IMutationCreateQuestionArgs,
  IMutationDeleteQuestionArgs,
  IQueryQuestionArgs,
  IMutationUpdateQuestionArgs,
  IMutationReorderQuestionsArgs,
} from "../graphql-types";
import { MyContext } from "../my-types";
import { Question } from "../db/models/Question";
import { Survey } from "../db/models/Survey";

export const typeDef = gql`
  extend type Query {
    question(id: ID!): Question!
  }

  input ReorderQuestionsInput {
    surveyId: ID!
    indexedIds: [IndexedId!]!
    startIndex: Int!
    endIndex: Int!
  }

  extend type Mutation {
    createQuestion(surveyId: ID!, order: Int!): Question!
    deleteQuestion(id: ID!, surveyId: ID!): Boolean!
    updateQuestion(id: ID!, surveyId: ID!, text: String!): Question!
    reorderQuestions(input: ReorderQuestionsInput!): Boolean!
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
      { surveyId, order }: IMutationCreateQuestionArgs,
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
          order,
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
    reorderQuestions: async (
      _: any,
      {
        input: { startIndex, endIndex, indexedIds, surveyId },
      }: IMutationReorderQuestionsArgs,
      { user: { id: userId } }: MyContext
    ): Promise<Boolean> => {
      if (startIndex !== endIndex) {
        const trx = await Question.startTransaction();

        try {
          const survey = await Survey.query().findOne({
            userId,
            id: surveyId,
          });

          indexedIds.map(async (question) => {
            await Question.query(trx)
              .update({
                order: question.index,
              })
              .where("id", question.id)
              .andWhere("surveyId", survey.id);

            await trx.commit();

            return true;
          });

          return true;
        } catch (err) {
          await trx.rollback();
          throw err;
        }
      }

      return true;
    },
  },
};
