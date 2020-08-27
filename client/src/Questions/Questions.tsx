import React from "react";
import { IQuestion } from "../graphql-types";
import Question from "./Question";
import { Button, ListGroup } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { css } from "@emotion/core";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

interface Props {
  questions: IQuestion[];
  surveyId: string;
}

const CREATE_QUESTION = gql`
  mutation CreateQuestion($surveyId: ID!, $order: Int!) {
    createQuestion(surveyId: $surveyId, order: $order) {
      id
      text
      order
    }
  }
`;

const REORDER_QUESTIONS = gql`
  mutation ReorderQuestions($input: ReorderQuestionsInput!) {
    reorderQuestions(input: $input)
  }
`;

const Questions: React.FC<Props> = ({ questions, surveyId }) => {
  const [createQuestion] = useMutation(CREATE_QUESTION, {
    variables: {
      surveyId,
      order: questions.length,
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
            questions: [...data.survey.questions, response.data.createQuestion],
          },
        },
      });
    },
  });

  const [reorderQuestions] = useMutation(REORDER_QUESTIONS);

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((result: any, index: number) => ({
      ...result,
      order: index,
    }));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.type === "SURVEY") {
      const reordered: any = reorder(
        questions,
        result.source.index,
        result.destination.index
      );

      reorderQuestions({
        variables: {
          input: {
            surveyId,
            indexedIds: reordered.map((question: IQuestion) => ({
              id: question.id,
              index: question.order,
            })),
            startIndex: result.source.index,
            endIndex: result.destination.index,
          },
        },
        optimisticResponse: {},
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
                    answers {
                      id
                      text
                      order
                    }
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
                    answers {
                      id
                      text
                      order
                    }
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
                questions: reordered,
              },
            },
          });
        },
      });
    }
  };

  return (
    <ListGroup
      css={css`
        margin-top: 15px;
      `}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          {questions.length === 0 ? (
            <ListGroup.Item>
              <h3>No Questions Are Available.</h3>
              <p className="text-secondary">
                Click below to add the first question to this survey.
              </p>
              <Button onClick={() => createQuestion()}>
                Add First Question
              </Button>
            </ListGroup.Item>
          ) : (
            <Droppable
              droppableId={`droppable-survey-${surveyId}`}
              type="SURVEY"
            >
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questions.map((question) => (
                    <Question
                      key={question.id}
                      question={question}
                      surveyId={surveyId}
                    />
                  ))}
                  {provided.placeholder}
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
            </Droppable>
          )}
        </div>
      </DragDropContext>
    </ListGroup>
  );
};

export default Questions;
