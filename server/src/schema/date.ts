import { gql } from "apollo-server-express";

import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

export const typeDef = gql`
  scalar Date
`;

export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value);
      }
      return null;
    },
  }),
};
