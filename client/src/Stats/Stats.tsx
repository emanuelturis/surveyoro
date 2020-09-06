import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  ISubmission,
  IQuerySubmissionsArgs,
  ISurvey,
  IQuerySurveyArgs,
} from "../graphql-types";
import groupBy from "lodash/groupBy";
import { ListGroup } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { css } from "@emotion/core";
import PreviewModal from "./PreviewModal";
import { Title, SubTitle } from "../Shared/Title";
import BackToDashboard from "../Shared/BackToDashboard";
import { ListItem } from "../Shared/ListItem";
import { Icon } from "../Shared/Icon";
import ReactTooltip from "react-tooltip";
import { Button } from "../Shared/Button";

const SUBMISSIONS = gql`
  query Submissions($surveyId: ID!, $offset: Int!) {
    submissions(surveyId: $surveyId, offset: $offset) {
      id
      personId
      questionId
      answerId
      answerText
      answer {
        id
        text
      }
      question {
        id
        text
        type
      }
      person {
        id
        firstName
        lastName
        email
        createdAt
      }
    }
  }
`;

const SURVEY = gql`
  query Survey($id: ID!) {
    survey(id: $id) {
      id
      name
    }
  }
`;

interface ISubmissionsData {
  submissions: ISubmission[];
}

interface ISurveyData {
  survey: ISurvey;
}

const Stats: React.FC = () => {
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [submissions, setSubmissions] = useState<ISubmission[] | null>(null);

  const { data, loading, fetchMore } = useQuery<
    ISubmissionsData,
    IQuerySubmissionsArgs
  >(SUBMISSIONS, {
    variables: {
      surveyId: id,
      offset: 0,
    },
  });

  const { data: surveyData, loading: surveyLoading } = useQuery<
    ISurveyData,
    IQuerySurveyArgs
  >(SURVEY, {
    variables: {
      id,
    },
  });

  if (loading || surveyLoading) {
    return null;
  }

  if (data && surveyData) {
    const personsSubmissions = groupBy(data.submissions, "personId");
    const persons = Object.keys(personsSubmissions);

    const getDate = (createdAt: string) => {
      const date = createdAt.split("T")[0];

      const time = createdAt.split("T")[1].split(".")[0];

      return date + " " + time;
    };

    return (
      <div>
        <PreviewModal
          submissions={submissions}
          show={show}
          handleClose={handleClose}
        />
        <BackToDashboard />
        <Title>{surveyData.survey.name}</Title>
        {data.submissions.length === 0 ? (
          <div>
            <ListItem
              css={css`
                margin-top: 25px;
              `}
            >
              <SubTitle>No Stats.</SubTitle>
              <p
                css={css`
                  margin: 0;
                `}
              >
                You'll see stats here once people start answering your survey...
              </p>
            </ListItem>
          </div>
        ) : (
          <ListGroup
            css={css`
              margin-top: 15px;
            `}
          >
            {persons.map((personId) => (
              <ListItem key={personId}>
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    p {
                      margin: 10px 0px;
                    }
                  `}
                >
                  <ReactTooltip
                    id={personId}
                    backgroundColor="rgba(57, 62, 70, 1)"
                    textColor="rgba(238, 238, 238, 1)"
                    effect="solid"
                  >
                    {getDate(personsSubmissions[personId][0].person.createdAt)}
                  </ReactTooltip>
                  <div>
                    <p>
                      Name: {personsSubmissions[personId][0].person.firstName}{" "}
                      {personsSubmissions[personId][0].person.lastName}
                    </p>
                    <p>Email: {personsSubmissions[personId][0].person.email}</p>
                    <p></p>
                  </div>
                  <Icon
                    data-tip={personId}
                    data-for={personId}
                    onClick={() => {
                      setSubmissions(personsSubmissions[personId]);
                      setShow(true);
                    }}
                  >
                    <FaEye />
                  </Icon>
                </div>
              </ListItem>
            ))}
          </ListGroup>
        )}
        <Button
          type="button"
          css={css`
            margin-top: 25px;
          `}
          onClick={() =>
            fetchMore({
              variables: {
                surveyId: id,
                offset: persons.length,
              },
              updateQuery: (prev: any, { fetchMoreResult }: any) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                  submissions: [
                    ...prev.submissions,
                    ...fetchMoreResult.submissions,
                  ],
                });
              },
            })
          }
        >
          Load More
        </Button>
      </div>
    );
  }

  return null;
};

export default Stats;
