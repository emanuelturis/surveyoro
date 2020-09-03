import React from "react";
import { Button, Form } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import {
  FormControl,
  FormikForm,
  SubmitButton,
  FormError,
} from "../Shared/Form";

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
        setSubmission(Object.assign({}, values));
        setStep(step + 1);
      }}
      validationSchema={detailsValidationSchema}
    >
      {() => (
        <FormikForm>
          <h3>Details</h3>
          <Form.Label>First Name</Form.Label>
          <FormControl
            type="text"
            name="firstName"
            placeholder="Enter your first name..."
          />
          <FormError component="p" name="firstName" className="text-danger" />
          <Form.Label>Last Name</Form.Label>
          <FormControl
            type="text"
            name="lastName"
            placeholder="Enter your last name..."
          />
          <FormError component="p" name="lastName" className="text-danger" />
          <Form.Label>Email Address</Form.Label>
          <FormControl
            type="text"
            name="email"
            placeholder="Enter your email address..."
          />
          <FormError component="p" name="email" className="text-danger" />
          <SubmitButton type="submit">Start Survey</SubmitButton>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Details;
