import React, { useState, useRef, useEffect, createRef } from "react";
import { FaPencilAlt, FaCheck } from "react-icons/fa";
import { css } from "@emotion/core";
import { Form } from "react-bootstrap";
import OnClickOutside from "../OnClickOutside";
import ContentEditable from "react-contenteditable";

interface Props {
  title: string;
  updateTitle: Function;
}

const EditableTitle: React.FC<Props> = ({ title, updateTitle }) => {
  const [disabled, setDisabled] = useState(true);
  const contentEditable = createRef<HTMLHtmlElement>();
  const [html, setHtml] = useState(title);

  const handleUpdateTitle = () => {
    setDisabled(() => {
      updateTitle(html);
      return true;
    });
  };

  useEffect(() => {
    if (!disabled) {
      contentEditable.current!.focus();
    }
  }, [!disabled]);

  return (
    <OnClickOutside handler={() => handleUpdateTitle()} active={!disabled}>
      <div className="d-flex align-items-center">
        <ContentEditable
          innerRef={contentEditable}
          html={html}
          disabled={disabled}
          onChange={(e) => {
            setHtml(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !disabled) {
              handleUpdateTitle();
            }
            if (e.keyCode === 27 && !disabled) {
              setHtml(title);
              setDisabled(true);
            }
          }}
          tagName="h1"
          css={css`
            margin: 0;
            padding: 0;
            outline: 0px solid transparent;
          `}
        />
        {!disabled ? (
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
              setDisabled(false);
            }}
          />
        )}
      </div>
    </OnClickOutside>
  );
};

export default EditableTitle;
