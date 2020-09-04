import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Alert } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { css } from "@emotion/core";
import * as yup from "yup";
import { FormikForm, FormControl, FormError } from "../Shared/Form";
import { Button } from "../Shared/Button";
import { Link } from "react-router-dom";

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        firstName
        lastName
        email
        surveys {
          id
          name
          active
        }
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
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 50px;
        @media (max-width: 768px) {
          padding: 0;
        }
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
                <FormControl
                  type="email"
                  name="email"
                  placeholder="Enter your email address..."
                />
                <FormError name="email" component="p" className="text-danger" />
                <Form.Label>Password</Form.Label>
                <FormControl
                  type="password"
                  name="password"
                  placeholder="Enter your password..."
                />
                <FormError
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
              <div
                css={css`
                  margin-top: 15px;
                `}
              >
                <Link to="/register">
                  Don't have an account yet? Click here to register.
                </Link>
                <p
                  css={css`
                    margin-top: 15px;
                  `}
                >
                  <b>Notice: </b>
                  Surveyoro is a demonstration application. Your data can be
                  erased at any time.
                </p>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
