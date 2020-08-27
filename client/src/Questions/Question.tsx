import React, { useState } from "react";
import { IQuestion } from "../graphql-types";
import { css } from "@emotion/core";
import { gql, useMutation } from "@apollo/client";
import { FaPencilAlt, FaTrash, FaCaretRight } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Accordion, Button } from "react-bootstrap";
import EditableText from "../Shared/EditableText/EditableText";
import Answers from "./Answers";

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

  return (
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
              cursor: pointer;
              &:hover {
                opacity: 1;
              }
            }
          `}
        >
          <FaTrash className="text-danger" onClick={() => deleteQuestion()} />
        </div>
      </div>
      {open && (
        <div>
          <hr />
          <Answers
            answers={question.answers}
            questionId={question.id}
            surveyId={surveyId}
          />
        </div>
      )}
    </div>
  );
};

export default Question;
