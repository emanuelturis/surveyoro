import React from "react";
import { IAnswer } from "../graphql-types";
import { Button } from "react-bootstrap";
import { css } from "@emotion/core";
import { gql, useMutation } from "@apollo/client";
import Answer from "./Answer";
import { Droppable, DragDropContext, DropResult } from "react-beautiful-dnd";

interface Props {
  answers: IAnswer[];
  questionId: string;
  surveyId: string;
}

const CREATE_ANSWER = gql`
  mutation CreateAnswer($questionId: ID!, $surveyId: ID!, $order: Int!) {
    createAnswer(questionId: $questionId, surveyId: $surveyId, order: $order) {
      id
      text
      order
    }
  }
`;

const REORDER_ANSWERS = gql`
  mutation ReorderAnswers($input: ReorderAnswersInput!) {
    reorderAnswers(input: $input)
  }
`;

const Answers: React.FC<Props> = ({ answers, questionId, surveyId }) => {
  const [createAnswer] = useMutation(CREATE_ANSWER, {
    variables: {
      questionId,
      surveyId,
      order: answers.length,
    },
    update: (cache, response) => {
      const data: any = cache.readFragment({
        id: `Question:${questionId}`,
        fragment: gql`
          fragment Question on Question {
            id
            text
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
          answers: [...data.answers, response.data.createAnswer],
        },
      });
    },
  });

  const [reorderAnswers] = useMutation(REORDER_ANSWERS);

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

    if (result.type === "QUESTION") {
      const reordered: any = reorder(
        answers,
        result.source.index,
        result.destination.index
      );

      reorderAnswers({
        variables: {
          input: {
            surveyId,
            questionId,
            indexedIds: reordered.map((answer: IAnswer) => ({
              id: answer.id,
              index: answer.order,
            })),
            startIndex: result.source.index,
            endIndex: result.destination.index,
          },
        },
        optimisticResponse: {},
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
              answers: reordered,
            },
          });
        },
      });
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
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
            <Droppable
              droppableId={`droppable-question-${questionId}`}
              type="QUESTION"
            >
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
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
                    {provided.placeholder}
                  </div>
                  <Button size="sm" onClick={() => createAnswer()}>
                    Add New Answer
                  </Button>
                </div>
              )}
            </Droppable>
          </div>
        )}
      </DragDropContext>
    </div>
  );
};

export default Answers;
