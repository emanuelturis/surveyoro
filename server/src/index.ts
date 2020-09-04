import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { Model } from "objection";
import knex from "./db/knex";
import { applyMiddleware } from "graphql-middleware";
import permissions from "./schema/permissions";
import cors from "cors";
import { User } from "./db/models/User";
import joi from "@hapi/joi";

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

app.get("/confirmation/:token", async (req, res) => {
  try {
    const confirmationToken = req.params.token;

    await joi.string().length(128).validateAsync(confirmationToken);

    await User.query()
      .update({
        confirmationToken: null,
        isConfirmed: true,
      })
      .where({
        confirmationToken,
      })
      .throwIfNotFound();
  } catch {
    return res.sendStatus(401);
  }

  return res.redirect(
    process.env.CLIENT_URL
      ? `${process.env.CLIENT_URL}/login`
      : "http://localhost:3000/login"
  );
});

server.applyMiddleware({ app, cors: false });

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
