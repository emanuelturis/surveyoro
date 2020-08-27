import { makeExecutableSchema, gql } from "apollo-server-express";
import { typeDef as User, resolvers as UserResolvers } from "./user";
import { typeDef as Survey, resolvers as SurveyResolvers } from "./survey";
import {
  typeDef as Question,
  resolvers as QuestionResolvers,
} from "./questions";
import { typeDef as Answer, resolvers as AnswerResolvers } from "./answers";
import merge from "lodash/merge";

const Query = gql`
  type Query {
    _empty: String
  }
`;

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

export default makeExecutableSchema({
  typeDefs: [Query, Mutation, User, Survey, Question, Answer],
  resolvers: merge(
    UserResolvers,
    SurveyResolvers,
    QuestionResolvers,
    AnswerResolvers
  ),
});
