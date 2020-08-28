import React, { useState } from "react";
import { IQuestion } from "../../graphql-types";
import { Form, Button } from "react-bootstrap";
import { IActions } from "../Question/Question";

interface Props {
  question: IQuestion;
  actions: IActions;
}

interface IRadioChecked {
  id: string;
  text: string;
}

const RadioQuestion = ({
  question,
  actions: { step, steps, setStep, setSubmission },
}: Props) => {
  const [checked, setChecked] = useState<IRadioChecked | null>(null);

  return (
    <div>
      <p>{question.text}</p>
      {question.answers.map((answer) => (
        <Form.Check
          key={answer.id}
          type="radio"
          checked={checked === answer}
          onChange={() => setChecked(answer)}
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
            questionId: question.id,
            answerId: checked.id,
            answerText: checked.text,
          });
        }}
      >
        {step === steps ? "Finish Survey" : "Next Question"}
      </Button>
    </div>
  );
};

export default RadioQuestion;
