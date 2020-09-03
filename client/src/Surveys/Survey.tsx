import React, { useState } from "react";
import { ISurvey } from "../graphql-types";
import { ListGroup } from "react-bootstrap";
import { FaTrash, FaPencilAlt, FaChartLine } from "react-icons/fa";
import { css } from "@emotion/core";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Icon } from "../Shared/Icon";
import { ListItem } from "../Shared/ListItem";
import DeleteModal from "../Shared/DeleteModal";

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

  const [showDeleteModa, setShowDeleteModal] = useState(false);

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
    <ListItem
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media (max-width: 768px) {
          flex-direction: column;
          align-items: flex-start;
        }
      `}
    >
      <p
        css={css`
          margin: 0;
        `}
      >
        {survey.name}
      </p>
      <DeleteModal
        show={showDeleteModa}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={() =>
          deleteSurvey({
            variables: {
              id: survey.id,
            },
          })
        }
        type="Survey"
        name={survey.name}
      />
      <div
        css={css`
          display: flex;
          align-items: center;
          ${Icon} {
            margin-left: 8px;
          }
          @media (max-width: 768px) {
            ${Icon} {
              margin-left: 0px;
              margin-right: 8px;
              margin-top: 10px;
            }
          }
        `}
      >
        <Icon onClick={() => history.push(`/surveys/${survey.id}/stats`)}>
          <FaChartLine />
        </Icon>
        <Icon onClick={() => history.push(`/surveys/${survey.id}`)}>
          <FaPencilAlt />
        </Icon>
        <Icon onClick={() => setShowDeleteModal(true)}>
          <FaTrash className="text-danger" />
        </Icon>
      </div>
    </ListItem>
  );
};

export default Survey;
