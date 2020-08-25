import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { Model } from "objection";
import knex from "./db/knex";
import { applyMiddleware } from "graphql-middleware";
import permissions from "./schema/permissions";

Model.knex(knex);

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: async ({ req, res }) => {
    return { req, res };
  },
});

const app = express();

server.applyMiddleware({ app });

app.listen({ port: 9000 }, () =>
  console.log(`🚀 Server ready at http://localhost:9000${server.graphqlPath}`)
);
