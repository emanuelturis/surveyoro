import React, { useState } from "react";
import { IQuestion } from "../../graphql-types";
import { Form, Button } from "react-bootstrap";
import { IActions } from "../Question/Question";
import { FormCheckbox, SubmitButton } from "../Shared/Form";

interface Props {
  question: IQuestion;
  actions: IActions;
}

const CheckQuestion = ({
  question,
  actions: { step, steps, setStep, setSubmission },
}: Props) => {
  const [checked, setChecked] = useState([]);

  return (
    <div>
      <h3>{question.text}</h3>
      {question.answers.map((answer) => (
        <FormCheckbox
          key={answer.id}
          checked={checked.includes(answer)}
          onClick={() => {
            if (checked.includes(answer)) {
              return setChecked((checked) => {
                return checked.filter(({ id }) => id !== answer.id);
              });
            }
            setChecked((checked) => {
              return [...checked, answer];
            });
          }}
          label={answer.text}
        />
      ))}
      <SubmitButton
        onClick={() => {
          if (checked.length === 0) {
            return;
          }
          setStep(step + 1);
          checked.map((c) => {
            setSubmission({
              questionId: question.id,
              answerId: c.id,
              answerText: c.text,
            });
          });
        }}
      >
        {steps === step ? "Finish Survey" : "Next Question"}
      </SubmitButton>
    </div>
  );
};

export default CheckQuestion;
