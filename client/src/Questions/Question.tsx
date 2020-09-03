import React, {
  useState,
  useRef,
  InputHTMLAttributes,
  createRef,
  useEffect,
} from "react";
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
import Answers from "./Answers";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { Icon } from "../Shared/Icon";
import UpdateFieldModal from "../Shared/UpdateFieldModal";
import { Formik } from "formik";
import { FormikForm, FormControl } from "../Shared/Form";
import { ListItem } from "../Shared/ListItem";

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
  const [showModal, setShowModal] = useState(false);

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
    <div key={question.id}>
      <UpdateFieldModal
        type="Question"
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={(text: string) => {
          setShowModal(false);
          updateQuestion({
            variables: {
              id: question.id,
              surveyId,
              text,
            },
          });
        }}
        initialValue={question.text}
      />
      <Draggable
        key={question.id}
        draggableId={question.id}
        index={question.order}
      >
        {(provided) => (
          <ListItem {...provided.draggableProps} ref={provided.innerRef}>
            <div>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <FaCaretRight
                    css={css`
                      margin-bottom: 2px;
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
                      display: flex;
                      align-items: center;
                      svg {
                        margin-right: 12px;
                        margin-left: 12px;
                        margin-bottom: 2px;
                        flex-shrink: 0;
                      }
                      p {
                        margin: 0;
                        padding: 0;
                      }
                    `}
                  >
                    {questionsIcons[question.type]}
                    <p>{question.text}</p>
                  </div>
                </div>
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
                  <Icon onClick={() => deleteQuestion()}>
                    <FaTrash className="text-danger" />
                  </Icon>
                  <Icon {...provided.dragHandleProps}>
                    <FaGripLines />
                  </Icon>
                </div>
              </div>
              {open && (
                <div>
                  <hr
                    css={css`
                      border-top: 2px solid #eaeaea;
                    `}
                  />
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
                        The question will have a text input, allowing any value
                        to be inserted.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ListItem>
        )}
      </Draggable>
    </div>
  );
};

export default Question;
