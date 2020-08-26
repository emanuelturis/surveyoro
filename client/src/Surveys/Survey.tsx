import React from "react";
import { ISurvey } from "../graphql-types";
import { ListGroup } from "react-bootstrap";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { css } from "@emotion/core";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

interface Props {
  survey: ISurvey;
}

const DELETE_SURVEY = gql`
  mutation DeleteSurvey($id: ID!) {
    deleteSurvey(id: $id)
  }
`;

const Survey: React.FC<Props> = ({ survey }) => {
  const history = useHistory();

  const [deleteSurvey] = useMutation(DELETE_SURVEY, {
    update: (cache) => {
      const data: any = cache.readQuery({
        query: gql`
          query User {
            user {
              id
              firstName
              lastName
              email
              surveys {
                id
                name
                active
              }
            }
          }
        `,
      });

      cache.writeQuery({
        query: gql`
          query User {
            user {
              id
              firstName
              lastName
              email
              surveys {
                id
                name
                active
              }
            }
          }
        `,
        data: {
          user: {
            ...data.user,
            surveys: [
              ...data.user.surveys.filter(
                ({ id }: ISurvey) => id !== survey.id
              ),
            ],
          },
        },
      });
    },
  });

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <div>{survey.name}</div>
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
        <FaPencilAlt onClick={() => history.push(`/surveys/${survey.id}`)} />
        <FaTrash
          className="text-danger"
          onClick={() =>
            deleteSurvey({
              variables: {
                id: survey.id,
              },
            })
          }
        />
      </div>
    </ListGroup.Item>
  );
};

export default Survey;
