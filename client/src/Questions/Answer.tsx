import React, { useState } from "react";
import { IAnswer } from "../graphql-types";
import EditableText from "../Shared/EditableText/EditableText";
import { css } from "@emotion/core";
import { gql, useMutation } from "@apollo/client";
import { FaTrash, FaGripLines, FaPencilAlt } from "react-icons/fa";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { Icon } from "../Shared/Icon";
import styled from "@emotion/styled";
import UpdateFieldModal from "../Shared/UpdateFieldModal";

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
  const [showModal, setShowModal] = useState(false);

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

  const getItemStyle = (
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot
  ) => ({
    ...provided.draggableProps.style,
    boxShadow: snapshot.isDragging ? "0px 5px 10px rgba(0, 0, 0, 0.075)" : "",
  });

  return (
    <div>
      <UpdateFieldModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        type="Answer"
        handleSubmit={(text: string) => {
          setShowModal(false);
          updateAnswer({
            variables: {
              id: answer.id,
              questionId,
              surveyId,
              text,
            },
          });
        }}
        initialValue={answer.text}
      />
      <Draggable key={answer.id} draggableId={answer.id} index={answer.order}>
        {(provided, snapshot) => (
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 10px 15px;
              background-color: #ffffff;
              border-radius: 5px;
              p {
                margin: 0;
              }
              &:hover {
                background-color: rgba(234, 234, 234, 0.25);
              }
            `}
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={getItemStyle(provided, snapshot)}
          >
            <p>{answer.text}</p>
            <div
              css={css`
                display: flex;
                align-items: center;
                ${Icon} {
                  margin-left: 8px;
                }
              `}
            >
              <Icon onClick={() => setShowModal(true)}>
                <FaPencilAlt />
              </Icon>
              <Icon onClick={() => deleteAnswer()}>
                <FaTrash className="text-danger" />
              </Icon>
              <Icon {...provided.dragHandleProps}>
                <FaGripLines />
              </Icon>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default Answer;
