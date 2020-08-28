import React from "react";
import { Button } from "react-bootstrap";

interface Props {
  onClick: Function;
}

const NextButton: React.FC<Props> = ({ onClick }) => {
  return <Button onClick={() => onClick()}>Next Question</Button>;
};

export default NextButton;
