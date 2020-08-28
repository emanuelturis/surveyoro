import React from "react";
import { Form, Button } from "react-bootstrap";
import { IQuestion } from "../../graphql-types";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as yup from "yup";
import { IActions } from "../Question/Question";

interface Props {
  question: IQuestion;
  actions: IActions;
}

const TextQuestion = ({
  question,
  actions: { step, steps, setStep, setSubmission },
}: Props) => {
  const textQuestionValidationSchema = yup.object().shape({
    [question.id]: yup
      .string()
      .required("You must answer this question to continue!"),
  });

  return (
    <Formik
      initialValues={{
        [question.id]: "",
      }}
      onSubmit={(values) => {
        setStep(step + 1);
        setSubmission({
          [question.id]: values[question.id],
        });
      }}
      validationSchema={textQuestionValidationSchema}
    >
      <FormikForm>
        {question.text}
        <Form.Control as={Field} type="text" name={question.id} />
        <ErrorMessage
          component="p"
          className="text-danger"
          name={question.id}
        />
        <Button type="submit">
          {step === steps ? "Finish Survey" : "Next Question"}
        </Button>
      </FormikForm>
    </Formik>
  );
};

export default TextQuestion;
