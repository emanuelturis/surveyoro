import React from "react";
import { Button, Form } from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as yup from "yup";

interface Props {
  step: number;
  steps: number;
  setStep: Function;
  setSubmission: Function;
}

const Details: React.FC<Props> = ({ step, steps, setStep, setSubmission }) => {
  const detailsValidationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required!"),
    lastName: yup.string().required("Last name is required!"),
    email: yup
      .string()
      .email("Email address is required!")
      .required("Email address is required!"),
  });

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "" }}
      onSubmit={(values) => {
        setSubmission(values);
        setStep(step + 1);
      }}
      validationSchema={detailsValidationSchema}
    >
      {() => (
        <FormikForm>
          <h1>Details</h1>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            as={Field}
            type="text"
            name="firstName"
            placeholder="Enter your first name..."
          />
          <ErrorMessage
            component="p"
            name="firstName"
            className="text-danger"
          />
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            as={Field}
            type="text"
            name="lastName"
            placeholder="Enter your last name..."
          />
          <ErrorMessage component="p" name="lastName" className="text-danger" />
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            as={Field}
            type="text"
            name="email"
            placeholder="Enter your email address..."
          />
          <ErrorMessage component="p" name="email" className="text-danger" />
          <Button type="submit">Start Survey</Button>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Details;
