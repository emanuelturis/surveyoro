import React, { useState, useEffect } from "react";
import { IQuestion } from "../../graphql-types";
import { IActions } from "../Question/Question";
import { FormRadio, SubmitButton } from "../Shared/Form";
import { css } from "@emotion/core";

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
      <h3>{question.text}</h3>
      {question.answers.map((answer) => (
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <FormRadio
            key={answer.id}
            checked={checked === answer}
            onClick={() => setChecked(answer)}
            label={answer.text}
            name={answer.id}
          />
        </div>
      ))}
      <SubmitButton
        onClick={() => {
          if (!checked) {
            return;
          }
          setSubmission([
            {
              questionId: question.id,
              answerId: checked.id,
              answerText: checked.text,
            },
          ]);
        }}
      >
        {step === steps ? "Finish Survey" : "Next Question"}
      </SubmitButton>
    </div>
  );
};

export default RadioQuestion;
