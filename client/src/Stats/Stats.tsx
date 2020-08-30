import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams, useLocation, useHistory } from "react-router-dom";
import {
  ISubmission,
  IQuerySubmissionsArgs,
  ISurvey,
  IQuerySurveyArgs,
} from "../graphql-types";
import groupBy from "lodash/groupBy";
import { Table } from "react-bootstrap";
import { FaCaretLeft, FaEye } from "react-icons/fa";
import { css } from "@emotion/core";
import PreviewModal from "./PreviewModal";

const SUBMISSIONS = gql`
  query Submissions($surveyId: ID!) {
    submissions(surveyId: $surveyId) {
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
  const history = useHistory();
  const location = useLocation();

  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const [submissions, setSubmissions] = useState<ISubmission[] | null>(null);

  const { data, loading } = useQuery<ISubmissionsData, IQuerySubmissionsArgs>(
    SUBMISSIONS,
    {
      variables: {
        surveyId: id,
      },
    }
  );

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
            onClick={() =>
              history.push(location.pathname.replace(`/${id}/stats`, ""))
            }
          />
          <h1>{surveyData.survey.name}</h1>
        </div>
        <Table
          bordered
          css={css`
            margin-top: 15px;
          `}
        >
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Submitted</th>
              <th className="text-center">Preview</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((personId) => (
              <tr key={personId}>
                <td>{personsSubmissions[personId][0].person.firstName}</td>
                <td>{personsSubmissions[personId][0].person.lastName}</td>
                <td>{personsSubmissions[personId][0].person.email}</td>
                <td>
                  {getDate(personsSubmissions[personId][0].person.createdAt)}
                </td>
                <td className="text-center">
                  <FaEye
                    css={css`
                      cursor: pointer;
                    `}
                    onClick={() => {
                      setSubmissions(personsSubmissions[personId]);
                      setShow(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  return null;
};

export default Stats;
