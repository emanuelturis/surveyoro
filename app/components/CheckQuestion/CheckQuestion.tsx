import React, { useState } from "react";
import { IQuestion } from "../../graphql-types";
import { Form, Button } from "react-bootstrap";
import { IActions } from "../Question/Question";

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
      <p>{question.text}</p>
      {question.answers.map((answer) => (
        <Form.Check
          key={answer.id}
          type="checkbox"
          checked={checked.includes(answer.id)}
          onChange={() => {
            if (checked.includes(answer.id)) {
              return setChecked((checked) => {
                return checked.filter((id) => id !== answer.id);
              });
            }
            setChecked((checked) => {
              return [...checked, answer.id];
            });
          }}
          label={answer.text}
        />
      ))}
      <Button
        onClick={() => {
          if (checked.length === 0) {
            return;
          }
          setStep(step + 1);
          setSubmission({
            [question.id]: checked,
          });
        }}
      >
        {steps === step ? "Finish Survey" : "Next Question"}
      </Button>
    </div>
  );
};

export default CheckQuestion;
