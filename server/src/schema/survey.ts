import { gql } from "apollo-server-express";
import {
  ISurvey,
  IQuerySurveyArgs,
  IMutationCreateSurveyArgs,
  IMutationDeleteSurveyArgs,
  IMutationUpdateSurveyArgs,
  IQuestion,
} from "../graphql-types";
import { Survey } from "../db/models/Survey";
import { Question } from "../db/models/Question";
import { MyContext } from "../my-types";
import { Answer } from "../db/models/Answer";

export const typeDef = gql`
  type Survey {
    id: ID!
    name: String!
    active: Boolean!
    questions: [Question!]!
  }

  type Question {
    id: ID!
    text: String!
    answers: [Answer!]!
  }

  type Person {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    answers: [Answer!]!
  }

  type Answer {
    id: ID!
    text: String!
  }

  type Submission {
    id: ID!
    person: Person!
    question: Question!
    answer: Answer!
  }

  extend type Query {
    survey(id: ID!): Survey!
  }

  extend type Mutation {
    createSurvey(name: String!): Survey!
    deleteSurvey(id: ID!): Boolean!
    updateSurvey(id: ID!, name: String!, active: Boolean!): Survey!
  }
`;

export const resolvers = {
  Query: {
    survey: async (_: any, { id }: IQuerySurveyArgs): Promise<Survey> => {
      return Survey.query().findOne("id", id);
    },
  },
  Survey: {
    questions: async ({ id }: ISurvey): Promise<Question[]> => {
      return Question.query()
        .where("surveyId", id)
        .orderBy("createdAt", "desc");
    },
  },
  Question: {
    answers: async ({ id }: IQuestion): Promise<Answer[]> => {
      return Answer.query()
        .where("questionId", id)
        .orderBy("createdAt", "desc");
    },
  },
  Mutation: {
    createSurvey: async (
      _: any,
      { name }: IMutationCreateSurveyArgs,
      { user: { id: userId } }: MyContext
    ): Promise<Survey> => {
      return Survey.query()
        .insert({
          name,
          userId,
        })
        .returning("*");
    },
    deleteSurvey: async (
      _: any,
      { id }: IMutationDeleteSurveyArgs,
      { user: { id: userId } }: MyContext
    ): Promise<Boolean> => {
      await Survey.query().delete().where("id", id).andWhere("userId", userId);
      return true;
    },
    updateSurvey: async (
      _: any,
      { id, name, active }: IMutationUpdateSurveyArgs,
      { user: { id: userId } }: MyContext
    ): Promise<Survey> => {
      return Survey.query()
        .update({
          name,
          active,
        })
        .where("id", id)
        .andWhere("userId", userId)
        .returning("*")
        .first();
    },
  },
};
