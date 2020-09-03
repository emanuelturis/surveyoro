import React, { useState } from "react";
import { Formik } from "formik";
import { gql, useMutation } from "@apollo/client";
import { Form, Alert } from "react-bootstrap";
import { css } from "@emotion/core";
import * as yup from "yup";
import { Redirect, useHistory, Link } from "react-router-dom";
import { FormikForm, FormControl, FormError } from "../Shared/Form";
import { Button } from "../Shared/Button";

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
                <FormControl
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name..."
                />
                <FormError
                  name="firstName"
                  component="p"
                  className="text-danger"
                />
                <Form.Label>Last Name</Form.Label>
                <FormControl
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name..."
                />
                <FormError
                  name="lastName"
                  component="p"
                  className="text-danger"
                />
                <Form.Label>Email Address</Form.Label>
                <FormControl
                  type="text"
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
                  css={css`
                    margin-top: 15px;
                  `}
                  type="submit"
                >
                  Register
                </Button>
                <div
                  css={css`
                    margin-top: 15px;
                  `}
                >
                  <Link to="/login">
                    Got an existing account? Click here to login.
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
              </FormikForm>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
