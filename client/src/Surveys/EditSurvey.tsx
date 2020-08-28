import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import { ISurvey, IQuerySurveyArgs } from "../graphql-types";
import {
  FaCaretLeft,
  FaWindowMaximize,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { css } from "@emotion/core";
import EditableTitle from "../Shared/EditableTitle/EditableTitle";
import Toggle from "react-toggle";
import "./Toggle.css";
import Questions from "../Questions";

const SURVEY = gql`
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
        answers {
          id
          text
          order
        }
      }
    }
  }
`;

const UPDATE_SURVEY = gql`
  mutation UpdateSurvey($id: ID!, $name: String!, $active: Boolean!) {
    updateSurvey(id: $id, name: $name, active: $active) {
      id
      name
      active
    }
  }
`;

interface ISurveyData {
  survey: ISurvey;
}

const EditSurvey: React.FC = () => {
  const history = useHistory();
  const { id } = useParams();

  const [updateSurvey] = useMutation(UPDATE_SURVEY);

  const { data, loading, error } = useQuery<ISurveyData, IQuerySurveyArgs>(
    SURVEY,
    {
      variables: { id },
    }
  );

  if (loading) {
    return null;
  }

  if (error) {
    return null;
  }

  return (
    <div>
      {data && (
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <FaCaretLeft
                css={css`
                  margin-bottom: 8px;
                  margin-right: 5px;
                  font-size: 25px;
                  opacity: 0.8;
                  cursor: pointer;
                  &:hover {
                    opacity: 1;
                  }
                `}
                onClick={() => history.goBack()}
              />
              <EditableTitle
                title={data.survey.name}
                updateTitle={(name: string) =>
                  updateSurvey({
                    variables: {
                      id,
                      active: data.survey.active,
                      name,
                    },
                  })
                }
              />
            </div>
            <div className="d-flex align-items-center">
              <a
                css={css`
                  text-decoration: none;
                `}
                href={`http://localhost:3001/${id}`}
                target="_blank"
              >
                <FaExternalLinkAlt
                  css={css`
                    font-size: 12.5px;
                    margin-bottom: 5px;
                    margin-right: 10px;
                    cursor: pointer;
                    opacity: 0.8;
                    &:hover {
                      opacity: 1;
                    }
                  `}
                />
              </a>
              <span
                css={css`
                  margin-right: 5px;
                  font-weight: 500;
                `}
                className="text-secondary"
              >
                Published
              </span>
              <Toggle
                checked={data.survey.active}
                onClick={() => {
                  updateSurvey({
                    variables: {
                      id,
                      name: data.survey.name,
                      active: !data.survey.active,
                    },
                  });
                }}
              />
            </div>
          </div>
          <Questions questions={data.survey.questions} surveyId={id} />
        </div>
      )}
    </div>
  );
};

export default EditSurvey;
