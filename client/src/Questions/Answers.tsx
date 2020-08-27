import React from "react";
import { IAnswer } from "../graphql-types";
import { Button } from "react-bootstrap";
import { css } from "@emotion/core";
import { gql, useMutation } from "@apollo/client";
import Answer from "./Answer";

interface Props {
  answers: IAnswer[];
  questionId: string;
  surveyId: string;
}

const CREATE_ANSWER = gql`
  mutation CreateAnswer($questionId: ID!, $surveyId: ID!) {
    createAnswer(questionId: $questionId, surveyId: $surveyId) {
      id
      text
    }
  }
`;

const Answers: React.FC<Props> = ({ answers, questionId, surveyId }) => {
  const [createAnswer] = useMutation(CREATE_ANSWER, {
    variables: {
      questionId,
      surveyId,
    },
    update: (cache, response) => {
      const data: any = cache.readFragment({
        id: `Question:${questionId}`,
        fragment: gql`
          fragment Question on Question {
            id
            text
            answers {
              id
              text
            }
          }
        `,
      });

      cache.writeFragment({
        id: `Question:${questionId}`,
        fragment: gql`
          fragment Question on Question {
            id
            text
            answers {
              id
              text
            }
          }
        `,
        data: {
          ...data,
          answers: [response.data.createAnswer, ...data.answers],
        },
      });
    },
  });

  return (
    <div>
      {answers.length === 0 ? (
        <div
          css={css`
            margin-bottom: 10px;
          `}
        >
          <h5>No Answers Are Available.</h5>
          <p className="text-secondary">
            Click below to add the first ansewer to this question.
          </p>
          <Button size="sm" onClick={() => createAnswer()}>
            Add First Answer
          </Button>
        </div>
      ) : (
        <div>
          <div
            css={css`
              margin-bottom: 15px;
            `}
          >
            {answers.map((answer) => (
              <Answer
                answer={answer}
                questionId={questionId}
                surveyId={surveyId}
              />
            ))}
          </div>
          <Button size="sm" onClick={() => createAnswer()}>
            Add New Answer
          </Button>
        </div>
      )}
    </div>
  );
};

export default Answers;
