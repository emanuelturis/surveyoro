import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import { ISurvey, IQuerySurveyArgs } from "../graphql-types";
import { FaExternalLinkAlt } from "react-icons/fa";
import { css } from "@emotion/core";
import Toggle from "react-toggle";
import "./Toggle.css";
import Questions from "../Questions";
import { Icon } from "../Shared/Icon";
import { Title } from "../Shared/Title";
import BackToDashboard from "../Shared/BackToDashboard";
import ReactTooltip from "react-tooltip";
import UpdateFieldModal from "../Shared/UpdateFieldModal";

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
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

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
          <BackToDashboard />
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              @media (max-width: 768px) {
                flex-direction: column-reverse;
                align-items: flex-start;
                ${Title} {
                  margin-top: 15px;
                }
              }
            `}
          >
            <UpdateFieldModal
              show={showModal}
              handleClose={() => setShowModal(false)}
              type="Survey Title"
              initialValue={data.survey.name}
              handleSubmit={(name: string) => {
                updateSurvey({
                  variables: {
                    id,
                    name,
                    active: data.survey.active,
                  },
                });
                setShowModal(false);
              }}
            />
            <ReactTooltip
              id="title"
              backgroundColor="rgba(57, 62, 70, 1)"
              textColor="rgba(238, 238, 238, 1)"
              effect="solid"
              delayShow={500}
            >
              Update Survey Title
            </ReactTooltip>
            <Title
              css={css`
                cursor: pointer;
              `}
              data-for="title"
              data-tip="titla"
              onClick={() => setShowModal(true)}
            >
              {data.survey.name}
            </Title>
            <div className="d-flex align-items-center">
              <a
                css={css`
                  text-decoration: none;
                `}
                href={
                  process.env.NODE_ENV === "production"
                    ? `https://surveyoro.com/${id}`
                    : `http://localhost:3001/${id}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon>
                  <FaExternalLinkAlt />
                </Icon>
              </a>
              <ReactTooltip
                id="active"
                delayShow={250}
                backgroundColor="rgba(57, 62, 70, 1)"
                textColor="rgba(238, 238, 238, 1)"
                effect="solid"
              >
                If the survey doesn't have any answerable question it will also
                be marked as draft.
              </ReactTooltip>
              <span
                css={css`
                  margin-left: 8px;
                  margin-right: 8px;
                  font-weight: 500;
                  @media (max-width: 768px) {
                    font-size: 0.889em;
                  }
                `}
                className="text-secondary"
                data-tip="active"
                data-for="active"
              >
                {data.survey.active ? "Published" : "Draft"}
              </span>
              <Toggle
                defaultChecked={data.survey.active}
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
