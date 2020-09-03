import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Title from "../../components/Title";
import { ISurvey, IQuerySurveyArgs } from "../../graphql-types";
import Layout from "../../components/Layout/Layout";
import Question from "../../components/Question";
import { useState, useEffect } from "react";
import Details from "../../components/Details";
import { Button, Container, Row, Col } from "react-bootstrap";
import { css } from "@emotion/core";
import Finished from "../../components/Finished";

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

interface ISurveyData {
  survey: ISurvey;
}

const Survey: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  const [step, setStep] = useState(0);
  const [submission, setSubmission] = useState([]);

  const { data, loading, error } = useQuery<ISurveyData, IQuerySurveyArgs>(
    SURVEY,
    {
      variables: {
        id: `${id}`,
      },
    }
  );

  useEffect(() => {
    if (submission.length !== 0) {
      setStep((s) => s + 1);
    }
  }, [submission]);

  if (loading) {
    return null;
  }

  if (
    (data && data.survey.active === false) ||
    (data && data.survey.questions.length === 0) ||
    error
  ) {
    return (
      <div
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: bold;
        `}
      >
        <h1>Survey Doesn't Exist.</h1>
      </div>
    );
  }

  const handleSetSubmission = (data: object[]) => {
    setSubmission((submission) => [...submission, ...data]);
  };

  const questions = data.survey.questions
    .filter((question) => {
      if (question.type !== "text" && question.answers.length === 0) {
        return false;
      }
      return true;
    })
    .map((question) =>
      Question(question, {
        step,
        steps: data.survey.questions.length,
        setStep,
        setSubmission: handleSetSubmission,
      })
    );

  const steps = [
    <Details
      step={step}
      steps={data.survey.questions.length}
      setStep={setStep}
      setSubmission={handleSetSubmission}
    />,
    ...questions,
    <Finished
      submission={submission}
      steps={data.survey.questions.length + 1}
      index={questions.length + 1}
      step={step}
    />,
  ];

  if (questions.length === 0) {
    return (
      <div
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: bold;
        `}
      >
        <h1>Survey Doesn't Exist.</h1>
      </div>
    );
  }

  return (
    <Container
      fluid
      css={css`
        background-color: #ffffff;
      `}
    >
      {data && (
        <Row className="justify-content-md-center">
          <Col
            css={css`
              padding: 25px 0px;
              @media (max-width: 768px) {
                padding: 25px 1em;
              }
            `}
            sm={8}
          >
            <Title>{data.survey.name}</Title>
            {steps[step]}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Survey;
