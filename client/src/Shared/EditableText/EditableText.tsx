import React, { createRef, useEffect, useState } from "react";
import { css } from "@emotion/core";
import { FaPencilAlt, FaCheck } from "react-icons/fa";
import OnClickOutside from "../OnClickOutside";

interface Props {
  text: string;
  updateText: Function;
}

const EditableText: React.FC<Props> = ({ text, updateText }) => {
  const [editable, setEditable] = useState(false);
  const inputRef = createRef<HTMLHeadingElement>();

  useEffect(() => {
    if (editable) {
      inputRef.current!.focus();
    }
  }, [editable]);

  const handleUpdateTitle = () => {
    setEditable(() => {
      updateText(inputRef.current?.innerText);
      return false;
    });
  };

  return (
    <OnClickOutside active={editable} handler={() => handleUpdateTitle()}>
      <div
        css={css`
          svg {
            font-size: 12.5px;
          }
        `}
        className="d-flex align-items-center"
      >
        <p
          ref={inputRef}
          contentEditable={editable ? true : false}
          onKeyDown={(e) => {
            if (e.key === "Enter" && editable) {
              handleUpdateTitle();
            }
          }}
          css={css`
            margin: 0;
            padding: 0;
            outline: 0px solid transparent;
          `}
        >
          {text}
        </p>
        {editable ? (
          <FaCheck
            css={css`
              margin-bottom: 2px;
              margin-left: 8px;
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
              margin-bottom: 2px;
              margin-left: 8px;
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

export default EditableText;
