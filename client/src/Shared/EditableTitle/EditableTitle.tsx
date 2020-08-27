import React, { useState, useRef, useEffect, createRef } from "react";
import { FaPencilAlt, FaCheck } from "react-icons/fa";
import { css } from "@emotion/core";
import { Form } from "react-bootstrap";
import OnClickOutside from "../OnClickOutside";

interface Props {
  title: string;
  updateTitle: Function;
}

const EditableTitle: React.FC<Props> = ({ title, updateTitle }) => {
  const [editable, setEditable] = useState(false);
  const inputRef = createRef<HTMLHeadingElement>();

  useEffect(() => {
    if (editable) {
      inputRef.current!.focus();
    }
  }, [editable]);

  const handleUpdateTitle = () => {
    setEditable(() => {
      updateTitle(inputRef.current!.innerText);
      return false;
    });
  };

  return (
    <OnClickOutside handler={() => handleUpdateTitle()} active={editable}>
      <div className="d-flex align-items-center">
        <h1
          ref={inputRef}
          contentEditable={editable ? true : false}
          onKeyDown={(e) => {
            if (e.key === "Enter" && editable) {
              handleUpdateTitle();
            }
          }}
          css={css`
            outline: 0px solid transparent;
          `}
        >
          {title}
        </h1>
        {editable ? (
          <FaCheck
            css={css`
              margin-bottom: 8px;
              margin-left: 5px;
              cursor: pointer;
              opacity: 0.8;
              &:hover {
                opacity: 1;
              }
            `}
            onClick={() => {
              handleUpdateTitle();
            }}
          />
        ) : (
          <FaPencilAlt
            css={css`
              margin-bottom: 8px;
              margin-left: 5px;
              cursor: pointer;
              opacity: 0.8;
              &:hover {
                opacity: 1;
              }
            `}
            onClick={() => {
              setEditable(true);
            }}
          />
        )}
      </div>
    </OnClickOutside>
  );
};

export default EditableTitle;
