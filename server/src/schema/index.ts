import { makeExecutableSchema } from "apollo-server-express";
import { typeDef as User, resolvers as UserResolvers } from "./user";
import merge from "lodash/merge";

export default makeExecutableSchema({
  typeDefs: [User],
  resolvers: merge(UserResolvers),
});
