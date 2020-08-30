import { makeExecutableSchema, gql } from "apollo-server-express";
import { typeDef as User, resolvers as UserResolvers } from "./user";
import { typeDef as Survey, resolvers as SurveyResolvers } from "./survey";
import {
  typeDef as Question,
  resolvers as QuestionResolvers,
} from "./questions";
import { typeDef as Answer, resolvers as AnswerResolvers } from "./answers";
import {
  typeDef as Submission,
  resolvers as SubmissionResolvers,
} from "./submissions";
import { typeDef as Date, resolvers as DateResolvers } from "./date";
import merge from "lodash/merge";

const Query = gql`
  type Query {
    _empty: String
  }

  input IndexedId {
    id: ID!
    index: Int!
  }
`;

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

export default makeExecutableSchema({
  typeDefs: [Query, Mutation, User, Survey, Question, Answer, Submission, Date],
  resolvers: merge(
    UserResolvers,
    SurveyResolvers,
    QuestionResolvers,
    AnswerResolvers,
    SubmissionResolvers,
    DateResolvers
  ),
});
