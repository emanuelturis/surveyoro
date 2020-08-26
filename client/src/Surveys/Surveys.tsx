import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ISurvey } from "../graphql-types";
import { ListGroup, Button } from "react-bootstrap";
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
      <ListGroup>
        {data.user.surveys.map((survey: ISurvey) => (
          <Survey survey={survey} />
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
  );
};

export default Surveys;
