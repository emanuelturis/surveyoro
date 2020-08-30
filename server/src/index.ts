import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { Model } from "objection";
import knex from "./db/knex";
import { applyMiddleware } from "graphql-middleware";
import permissions from "./schema/permissions";
import cors from "cors";

Model.knex(knex);

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: async ({ req, res }) => {
    return { req, res };
  },
});

const app = express();

const port = process.env.PORT || 9000;

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:3000",
      process.env.APP_URL || "http://localhost:3001",
    ],
  })
);

server.applyMiddleware({ app, cors: false });

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
