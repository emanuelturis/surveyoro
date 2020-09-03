import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

interface Props {
  submission: Array<object>;
  steps: number;
}

const ADD_SUBMISSION = gql`
  mutation AddSubmission(
    $person: PersonInput!
    $submission: [SubmissionInput!]!
    $surveyId: String!
  ) {
    addSubmission(person: $person, submission: $submission, surveyId: $surveyId)
  }
`;

const Finished: React.FC<Props> = ({ submission }) => {
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const [addSubmission] = useMutation(ADD_SUBMISSION);

  useEffect(() => {
    addSubmission({
      variables: {
        surveyId: `${id}`,
        person: submission[0],
        submission: submission.slice(1),
      },
    }).then(() => setSubmitted(true));
  }, []);

  return (
    <div>
      {submitted ? (
        <div>
          <h3>Thank You!</h3>
          <p>Your survey was successfully submitted.</p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Finished;
