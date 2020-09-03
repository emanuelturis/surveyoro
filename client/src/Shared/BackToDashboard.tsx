import React from "react";
import { css } from "@emotion/core";
import { FaCaretLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const BackToDashboard: React.FC = () => {
  const history = useHistory();
  return (
    <div
      onClick={() => history.push("/")}
      css={css`
        display: flex;
        cursor: pointer;
        opacity: 0.8;
        transition: all 125ms ease-in-out;
        width: 180px;
        &:hover {
          opacity: 1;
        }
        svg {
          margin-top: 3px;
        }
        @media (max-width: 768px) {
          font-size: 0.889em;
        }
      `}
    >
      <FaCaretLeft />
      <p>Back To Dashboard</p>
    </div>
  );
};

export default BackToDashboard;
