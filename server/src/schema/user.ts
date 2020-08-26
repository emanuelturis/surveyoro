import { gql, AuthenticationError } from "apollo-server-express";
import {
  IUser,
  IMutationRegisterArgs,
  IMutationLoginArgs,
} from "../graphql-types";
import { MyContext } from "../my-types";
import { User } from "../db/models/User";
import bcrypt from "bcrypt";
import { createToken } from "../utils/auth";
import { Survey } from "../db/models/Survey";

export const typeDef = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    surveys: [Survey!]
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type UserWithToken {
    user: User!
    token: String!
  }

  extend type Query {
    user: User!
  }

  extend type Mutation {
    register(input: RegisterInput!): Boolean!
    login(input: LoginInput!): UserWithToken!
  }
`;

export const resolvers = {
  Query: {
    user: (_: any, __: any, { user }: MyContext): User => {
      return user;
    },
  },
  User: {
    surveys: ({ id }: IUser): Promise<Survey[]> => {
      return Survey.query().where("userId", id).orderBy("createdAt", "desc");
    },
  },
  Mutation: {
    register: async (
      _: any,
      { input: { firstName, lastName, email, password } }: IMutationRegisterArgs
    ): Promise<Boolean> => {
      const existing = await User.query()
        .select("email")
        .where("email", email)
        .first();

      if (existing) {
        throw new AuthenticationError("Email address already exists.");
      }

      const saltRounds = 10;
      const plainTextPassword = password;
      const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

      await User.query()
        .insert({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        })
        .returning("id");

      return true;
    },
    login: async (
      _: any,
      { input: { email, password } }: IMutationLoginArgs
    ) => {
      const user = await User.query().findOne({ email });

      if (!user) {
        throw new AuthenticationError("Email address not found.");
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new AuthenticationError("Incorrect password.");
      }

      const token = createToken(user);

      return { token, user };
    },
  },
};
