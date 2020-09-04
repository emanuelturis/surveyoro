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
import joi from "@hapi/joi";
import { generateToken } from "../utils/generateToken";
import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

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
      try {
        await joi
          .object({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required(),
          })
          .validateAsync({ firstName, lastName, email, password });
      } catch (error) {
        throw error;
      }

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

      const token = await generateToken();

      const user = await User.query()
        .insert({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          confirmationToken: token,
        })
        .returning("*");

      if (process.env.NODE_ENV !== "production") {
        const transporter = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "7f104d587e7ef8",
            pass: "d31b2036ed47d8",
          },
        });

        await transporter.sendMail({
          from: '"Surveyoro 👻" <support@surveyoro.com>',
          to: user.email,
          subject: "Confirm Your Surveyoro Account",
          text: `
        You have recieved this message because you created a Surveyoro account with this email.
        Click the link below to confirm your account and start using Surveyoro.
        Confirm Account
          `,
          html: `
        <h3>You have recieved this message because you created a Surveyoro account with this email.</h3>
        <p>Click the link below to confirm your account and start using Surveyoro.</p>
        <a href="http://localhost:9000/confirmation/${user.confirmationToken}">Confirm Account</a>
          `,
        });
      }

      if (process.env.NODE_ENV === "production") {
        const transporter = nodemailer.createTransport(
          nodemailerSendgrid({
            apiKey: process.env.SENDGRID_API_KEY || "",
          })
        );

        await transporter.sendMail({
          from: '"Surveyoro 👻" <support@surveyoro.com>',
          to: user.email,
          subject: "Confirm Your Surveyoro Account",
          text: `
        You have recieved this message because you created a Surveyoro account with this email.
        Click the link below to confirm your account and start using Surveyoro.
        Confirm Account
          `,
          html: `
        <h3>You have recieved this message because you created a Surveyoro account with this email.</h3>
        <p>Click the link below to confirm your account and start using Surveyoro.</p>
        <a href="https://api.surveyoro.com/confirmation/${user.confirmationToken}">Confirm Account</a>
          `,
        });
      }

      return true;
    },
    login: async (
      _: any,
      { input: { email, password } }: IMutationLoginArgs
    ) => {
      try {
        await joi
          .object({
            email: joi.string().email().required(),
            password: joi.string().required(),
          })
          .validateAsync({ email, password });
      } catch (error) {
        throw error;
      }

      const user = await User.query().findOne({ email });

      if (!user) {
        throw new AuthenticationError("Email address not found.");
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new AuthenticationError("Incorrect password.");
      }

      if (!user.isConfirmed) {
        throw new AuthenticationError(
          "Please check your email for a confirmation link to activate your account and start using Surveyoro."
        );
      }

      const token = createToken(user);

      return { token, user };
    },
  },
};
