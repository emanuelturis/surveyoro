import React, { useState } from "react";
import { IQuestion } from "../../graphql-types";
import { IActions } from "../Question/Question";
import { FormCheckbox, SubmitButton } from "../Shared/Form";
import { css } from "@emotion/core";

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
      <div
        css={css`
          margin-top: 15px;
        `}
      >
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
            name={answer.id}
          />
        ))}
        <SubmitButton
          onClick={() => {
            if (checked.length === 0) {
              return;
            }
            const submission = checked.map((c) => ({
              questionId: question.id,
              answerId: c.id,
              answerText: c.text,
            }));
            setSubmission(submission);
          }}
        >
          {steps === step ? "Finish Survey" : "Next Question"}
        </SubmitButton>
      </div>
    </div>
  );
};

export default CheckQuestion;
