import React, { useState } from "react";
import { IQuestion } from "../../graphql-types";
import { Form, Button } from "react-bootstrap";
import { IActions } from "../Question/Question";

interface Props {
  question: IQuestion;
  actions: IActions;
}

const RadioQuestion = ({
  question,
  actions: { step, steps, setStep, setSubmission },
}: Props) => {
  const [checked, setChecked] = useState<string | null>(null);

  return (
    <div>
      <p>{question.text}</p>
      {question.answers.map((answer) => (
        <Form.Check
          key={answer.id}
          type="radio"
          checked={checked === answer.id}
          onChange={() => setChecked(answer.id)}
          label={answer.text}
        />
      ))}
      <Button
        onClick={() => {
          if (!checked) {
            return;
          }
          setStep(step + 1);
          setSubmission({
            [question.id]: checked,
          });
        }}
      >
        {step === steps ? "Finish Survey" : "Next Question"}
      </Button>
    </div>
  );
};

export default RadioQuestion;
