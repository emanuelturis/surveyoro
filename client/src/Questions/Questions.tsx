import React from "react";
import { IQuestion } from "../graphql-types";
import Question from "./Question";
import { Button, ListGroup } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { css } from "@emotion/core";

interface Props {
  questions: IQuestion[];
  surveyId: string;
}

const CREATE_QUESTION = gql`
  mutation CreateQuestion($surveyId: ID!) {
    createQuestion(surveyId: $surveyId) {
      id
      text
    }
  }
`;

const Questions: React.FC<Props> = ({ questions, surveyId }) => {
  const [createQuestion] = useMutation(CREATE_QUESTION, {
    variables: {
      surveyId,
    },
    update: (cache, response) => {
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
            questions: [response.data.createQuestion, ...data.survey.questions],
          },
        },
      });
    },
  });

  return (
    <ListGroup
      css={css`
        margin-top: 15px;
      `}
    >
      {questions.length === 0 ? (
        <ListGroup.Item>
          <h3>No Questions Are Available.</h3>
          <p className="text-secondary">
            Click below to add the first question to this survey.
          </p>
          <Button onClick={() => createQuestion()}>Add First Question</Button>
        </ListGroup.Item>
      ) : (
        <div>
          {questions.map((question) => (
            <ListGroup.Item key={question.id}>
              <Question question={question} surveyId={surveyId} />
            </ListGroup.Item>
          ))}
          <Button
            css={css`
              margin-top: 25px;
            `}
            onClick={() => createQuestion()}
          >
            Add New Question
          </Button>
        </div>
      )}
    </ListGroup>
  );
};

export default Questions;
