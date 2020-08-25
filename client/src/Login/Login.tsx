import React, { useState } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { Form, Button, Alert } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { css } from "@emotion/core";
import * as yup from "yup";

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        firstName
        lastName
        email
      }
      token
    }
  }
`;

const Login: React.FC = () => {
  const [login] = useMutation(LOGIN, {
    update: (cache, { data }) => {
      cache.writeQuery({
        query: gql`
          query User {
            user {
              id
              firstName
              lastName
              email
            }
          }
        `,
        data: {
          user: data.login.user,
        },
      });
    },
  });

  const [error, setError] = useState<string | null>(null);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email address is required.")
      .required("Email address is required."),
    password: yup.string().required("Password is required."),
  });

  return (
    <div
      className="card"
      css={css`
        margin-top: 25px;
      `}
    >
      <div className="card-body">
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={({ email, password }) => {
            login({
              variables: {
                input: {
                  email,
                  password,
                },
              },
            })
              .then(({ data }) => {
                localStorage.setItem("token", data.login.token);
              })
              .catch((error) => {
                setError(error.message);
              });
          }}
          validationSchema={loginValidationSchema}
        >
          {() => (
            <div>
              {error ? <Alert variant="danger">{error}</Alert> : null}
              <FormikForm>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  as={Field}
                  type="email"
                  name="email"
                  placeholder="Enter your email address..."
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-danger"
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                  as={Field}
                  type="password"
                  name="password"
                  placeholder="Enter your password..."
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-danger"
                />
                <Button
                  type="submit"
                  css={css`
                    margin-top: 15px;
                  `}
                >
                  Login
                </Button>
              </FormikForm>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
