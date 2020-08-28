import React, { useEffect } from "react";

interface Props {
  submission: object;
}

const Finished: React.FC<Props> = ({ submission }) => {
  useEffect(() => {
    console.log(submission);
  }, []);

  return (
    <div>
      <h3>Thank You!</h3>
      <p>Your survey was successfully submitted.</p>
    </div>
  );
};

export default Finished;
