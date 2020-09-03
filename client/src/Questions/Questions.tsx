import React, { Component, useState } from "react";
import { IQuestion } from "../graphql-types";
import Question from "./Question";
import { ListGroup } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { css } from "@emotion/core";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Button } from "../Shared/Button";
import Dropdown from "../Shared/Dropdown";
import OnClickOutside from "../Shared/OnClickOutside";
import { FaListUl, FaRegCircle, FaKeyboard } from "react-icons/fa";
import { ListItem } from "../Shared/ListItem";
import { SubTitle } from "../Shared/Title";

interface Props {
  questions: IQuestion[];
  surveyId: string;
}

const CREATE_QUESTION = gql`
  mutation CreateQuestion($surveyId: ID!, $type: String!, $order: Int!) {
    createQuestion(surveyId: $surveyId, type: $type, order: $order) {
      id
      text
      type
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
  const [dropdown, setDropdown] = useState(false);

  const [createQuestion] = useMutation(CREATE_QUESTION, {
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
                type
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
                type
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

  const handleCreateQuestion = (type: string) => {
    createQuestion({
      variables: {
        surveyId,
        order: questions.length,
        type,
      },
    });
  };

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
    <ListGroup>
      <DragDropContext onDragEnd={onDragEnd}>
        {questions.length === 0 ? (
          <ListItem
            css={css`
              margin-top: 25px;
            `}
          >
            <SubTitle>No Questions Are Available.</SubTitle>
            <p className="text-secondary">
              Click below to add the first question to this survey.
            </p>
            <Button onClick={() => handleCreateQuestion("radio")}>
              Add First Question
            </Button>
          </ListItem>
        ) : (
          <Droppable droppableId={`droppable-survey-${surveyId}`} type="SURVEY">
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
                <OnClickOutside
                  active={dropdown}
                  handler={() => setDropdown(false)}
                >
                  <Button
                    css={css`
                      margin-top: 25px;
                    `}
                    onClick={() => setDropdown(!dropdown)}
                  >
                    Add New Question
                  </Button>
                  <Dropdown show={dropdown} setShow={setDropdown}>
                    <ul
                      css={css`
                        padding: 8px 0px;
                        background-color: #eaeaea;
                        width: 250px;
                        border-radius: 5px;
                        margin-top: 10px;
                        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
                        li {
                          list-style-type: none;
                          padding: 8px 25px;
                          cursor: pointer;
                          &:hover {
                            background-color: rgba(0, 0, 0, 0.125);
                          }
                        }
                        svg {
                          margin-bottom: 3px;
                          margin-right: 4px;
                        }
                      `}
                    >
                      <li onClick={() => handleCreateQuestion("check")}>
                        <FaListUl />
                        <span>Multi-Option</span>
                      </li>
                      <li onClick={() => handleCreateQuestion("radio")}>
                        <FaRegCircle />
                        <span>One-Option</span>
                      </li>
                      <li onClick={() => handleCreateQuestion("text")}>
                        <FaKeyboard />
                        <span>Text</span>
                      </li>
                    </ul>
                  </Dropdown>
                </OnClickOutside>
              </div>
            )}
          </Droppable>
        )}
      </DragDropContext>
    </ListGroup>
  );
};

export default Questions;
