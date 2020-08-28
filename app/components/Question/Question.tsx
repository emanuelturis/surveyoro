import React from "react";
import TextQuestion from "../TextQuestion";
import { IQuestion } from "../../graphql-types";
import RadioQuestion from "../RadioQuestion";
import CheckQuestion from "../CheckQuestion";

const QuestionTypes = {
  text: TextQuestion,
  radio: RadioQuestion,
  check: CheckQuestion,
};

export interface IActions {
  steps: number;
  step: number;
  setStep: Function;
  setSubmission: Function;
}

const Question = (
  question: IQuestion,
  { step, steps, setStep, setSubmission }: IActions
) => {
  if (typeof QuestionTypes[question.type] !== "undefined") {
    return React.createElement(QuestionTypes[question.type], {
      question,
      actions: {
        step,
        steps,
        setStep,
        setSubmission,
      },
    });
  }
};

export default Question;
