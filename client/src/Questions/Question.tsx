import React, { useState } from "react";
import { IQuestion } from "../graphql-types";
import { css } from "@emotion/core";
import { gql, useMutation } from "@apollo/client";
import {
  FaPencilAlt,
  FaTrash,
  FaCaretRight,
  FaGripLines,
  FaKeyboard,
  FaRegCircle,
  FaListUl,
} from "react-icons/fa";
import { ListGroup } from "react-bootstrap";
import EditableText from "../Shared/EditableText/EditableText";
import Answers from "./Answers";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

interface Props {
  question: IQuestion;
  surveyId: string;
}

const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: ID!, $surveyId: ID!) {
    deleteQuestion(id: $id, surveyId: $surveyId)
  }
`;

const UPDATE_QUESTION = gql`
  mutation UpdateQuestion($id: ID!, $surveyId: ID!, $text: String!) {
    updateQuestion(id: $id, surveyId: $surveyId, text: $text) {
      id
      text
      type
      order
    }
  }
`;

const Question: React.FC<Props> = ({ question, surveyId }) => {
  const [open, setOpen] = useState(false);

  const [updateQuestion] = useMutation(UPDATE_QUESTION);

  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    variables: {
      id: question.id,
      surveyId,
    },
    update: (cache) => {
      const data: any = cache.readQuery({
        query: gql`
          query Survey($id: ID!) {
            survey(id: $id) {
              id
              name
              active
              questions {
                id
                text
                order
              }
            }
          }
        `,
        variables: {
          id: surveyId,
        },
      });

      cache.writeQuery({
        query: gql`
          query Survey($id: ID!) {
            survey(id: $id) {
              id
              name
              active
              questions {
                id
                text
                order
              }
            }
          }
        `,
        variables: {
          id: surveyId,
        },
        data: {
          survey: {
            ...data.survey,
            questions: [
              ...data.survey.questions.filter(
                ({ id }: IQuestion) => id !== question.id
              ),
            ],
          },
        },
      });
    },
  });

  const questionsIcons: { [key: string]: JSX.Element } = {
    text: <FaKeyboard />,
    radio: <FaRegCircle />,
    check: <FaListUl />,
  };

  return (
    <Draggable
      key={question.id}
      draggableId={question.id}
      index={question.order}
    >
      {(provided) => (
        <ListGroup.Item
          {...provided.draggableProps}
          ref={provided.innerRef}
          css={css`
            border: 1px solid rgba(0, 0, 0, 0.125) !important;
            margin-top: 10px;
          `}
        >
          <div>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <FaCaretRight
                  css={css`
                    margin-bottom: 2px;
                    margin-right: 5px;
                    transform: ${open ? `rotate(90deg)` : `rotate(0deg)`};
                    cursor: pointer;
                    opacity: 0.8;
                    &:hover {
                      opacity: 1;
                    }
                  `}
                  onClick={() => setOpen(!open)}
                />
                <div
                  css={css`
                    svg {
                      margin-right: 5px;
                      margin-bottom: 4px;
                    }
                  `}
                >
                  {questionsIcons[question.type]}
                </div>
                <EditableText
                  text={question.text}
                  updateText={(text: string) => {
                    updateQuestion({
                      variables: {
                        id: question.id,
                        surveyId,
                        text,
                      },
                    });
                  }}
                />
              </div>
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
                    cursor: pointer;
                  `}
                  className="text-danger"
                  onClick={() => deleteQuestion()}
                />
                <span {...provided.dragHandleProps}>
                  <FaGripLines />
                </span>
              </div>
            </div>
            {open && (
              <div>
                <hr />
                {question.type !== "text" ? (
                  <Answers
                    answers={question.answers}
                    questionId={question.id}
                    surveyId={surveyId}
                  />
                ) : (
                  <div>
                    <h5>Question is a {question.type}.</h5>
                    <p className="text-secondary">
                      The question will have a text input, allowing any value to
                      be inserted.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </ListGroup.Item>
      )}
    </Draggable>
  );
};

export default Question;
