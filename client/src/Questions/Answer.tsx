import React from "react";
import { IAnswer } from "../graphql-types";
import EditableText from "../Shared/EditableText/EditableText";
import { css } from "@emotion/core";
import { gql, useMutation } from "@apollo/client";
import { FaTrash, FaGripLines } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";

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
      order
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
            type
            order
            answers {
              id
              text
              order
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
            type
            order
            answers {
              id
              text
              order
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
    <Draggable key={answer.id} draggableId={answer.id} index={answer.order}>
      {(provided) => (
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 10px 0px;
          `}
          {...provided.draggableProps}
          ref={provided.innerRef}
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
          <div
            css={css`
              svg {
                font-size: 15px;
                opacity: 0.8;
                margin-left: 15px;
                &:hover {
                  opacity: 1;
                }
              }
            `}
          >
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
            <span {...provided.dragHandleProps}>
              <FaGripLines />
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Answer;
