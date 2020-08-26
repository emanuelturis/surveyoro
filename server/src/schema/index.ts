import { makeExecutableSchema, gql } from "apollo-server-express";
import { typeDef as User, resolvers as UserResolvers } from "./user";
import { typeDef as Survey, resolvers as SurveyResolvers } from "./survey";
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
  typeDefs: [Query, Mutation, User, Survey],
  resolvers: merge(UserResolvers, SurveyResolvers),
});
