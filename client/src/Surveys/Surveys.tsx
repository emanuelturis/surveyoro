import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ISurvey } from "../graphql-types";
import { ListGroup, Button, Alert } from "react-bootstrap";
import { css } from "@emotion/core";
import CreateSurveyModal from "./CreateSurveyModal";
import Survey from "./Survey";

const USER = gql`
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
`;

const Surveys: React.FC = () => {
  const { data, loading } = useQuery(USER);

  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  if (loading) {
    return null;
  }

  return (
    <div>
      <CreateSurveyModal show={show} handleClose={handleClose} />
      <h1
        css={css`
          margin-bottom: 25px;
        `}
      >
        Surveys
      </h1>
      {data.user.surveys.length === 0 ? (
        <ListGroup.Item>
          <h4>You Don't Have Any Surveys Yet</h4>
          <p>Click the button below to create your first survey...</p>
          <Button onClick={handleOpen}>Create Your First Survey</Button>
        </ListGroup.Item>
      ) : (
        <div>
          <ListGroup>
            {data.user.surveys.map((survey: ISurvey) => (
              <Survey key={survey.id} survey={survey} />
            ))}
          </ListGroup>
          <Button
            css={css`
              margin-top: 25px;
            `}
            onClick={handleOpen}
          >
            Create New Survey
          </Button>
        </div>
      )}
    </div>
  );
};

export default Surveys;
