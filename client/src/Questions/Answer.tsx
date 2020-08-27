import React from "react";
import { IAnswer } from "../graphql-types";
import EditableText from "../Shared/EditableText/EditableText";
import { css } from "@emotion/core";
import { gql, useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";

interface Props {
  answer: IAnswer;
  questionId: string;
  surveyId: string;
}

const UPDATE_ANSWER = gql`
  mutation UpdateAnswer(
    $id: ID!
    $questionId: ID!
    $surveyId: ID!
    $text: String!
  ) {
    updateAnswer(
      id: $id
      questionId: $questionId
      surveyId: $surveyId
      text: $text
    ) {
      id
      text
    }
  }
`;

const DELETE_ANSWER = gql`
  mutation DeleteAnswer($id: ID!, $questionId: ID!, $surveyId: ID!) {
    deleteAnswer(id: $id, questionId: $questionId, surveyId: $surveyId)
  }
`;

const Answer: React.FC<Props> = ({ answer, questionId, surveyId }) => {
  const [updateAnswer] = useMutation(UPDATE_ANSWER);
  const [deleteAnswer] = useMutation(DELETE_ANSWER, {
    variables: {
      id: answer.id,
      questionId,
      surveyId,
    },
    update: (cache) => {
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
          answers: [
            ...data.answers.filter(({ id }: IAnswer) => id !== answer.id),
          ],
        },
      });
    },
  });

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0px;
      `}
    >
      <EditableText
        text={answer.text}
        updateText={(text: string) => {
          updateAnswer({
            variables: {
              id: answer.id,
              questionId,
              surveyId,
              text,
            },
          });
        }}
      />
      <FaTrash
        css={css`
          font-size: 15px;
          opacity: 0.8;
          margin-left: 15px;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        `}
        className="text-danger"
        onClick={() => deleteAnswer()}
      />
    </div>
  );
};

export default Answer;
