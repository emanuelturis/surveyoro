import React, { useState } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { gql, useMutation } from "@apollo/client";
import { Form, Button, Alert } from "react-bootstrap";
import { css } from "@emotion/core";
import * as yup from "yup";
import { Redirect, useHistory } from "react-router-dom";

const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input)
  }
`;

const Register: React.FC = () => {
  const [register] = useMutation(REGISTER);

  const [error, setError] = useState<string | null>(null);

  const registerValidationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required."),
    lastName: yup.string().required("Last name is required."),
    email: yup
      .string()
      .email("Email address is required.")
      .required("Email address is required."),
    password: yup.string().required("Password is required."),
  });

  const history = useHistory();

  return (
    <div
      className="card"
      css={css`
        margin-top: 25px;
      `}
    >
      <div className="card-body">
        <h1>Register</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={({ firstName, lastName, email, password }) => {
            register({
              variables: {
                input: {
                  firstName,
                  lastName,
                  email,
                  password,
                },
              },
            })
              .then(() => {
                history.push("/login");
              })
              .catch((error) => {
                setError(error.message);
              });
          }}
          validationSchema={registerValidationSchema}
        >
          {() => (
            <div>
              {error ? <Alert variant="danger">{error}</Alert> : null}
              <FormikForm>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  as={Field}
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name..."
                />
                <ErrorMessage
                  name="firstName"
                  component="p"
                  className="text-danger"
                />
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  as={Field}
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name..."
                />
                <ErrorMessage
                  name="lastName"
                  component="p"
                  className="text-danger"
                />
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  as={Field}
                  type="text"
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
                  css={css`
                    margin-top: 15px;
                  `}
                  type="submit"
                >
                  Register
                </Button>
              </FormikForm>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
