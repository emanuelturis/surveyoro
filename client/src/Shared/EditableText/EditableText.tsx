import React, { createRef, useEffect, useState } from "react";
import { css } from "@emotion/core";
import { FaPencilAlt, FaCheck } from "react-icons/fa";
import OnClickOutside from "../OnClickOutside";
import ContentEditable from "react-contenteditable";

interface Props {
  text: string;
  updateText: Function;
}

const EditableText: React.FC<Props> = ({ text, updateText }) => {
  const [disabled, setDisabled] = useState(true);
  const contentEditable = createRef<HTMLHtmlElement>();
  const [html, setHtml] = useState(text);

  const handleUpdateText = () => {
    setDisabled(() => {
      updateText(html);
      return true;
    });
  };

  useEffect(() => {
    if (!disabled) {
      contentEditable.current!.focus();
    }
  }, [!disabled]);

  return (
    <OnClickOutside active={!disabled} handler={() => handleUpdateText()}>
      <div
        css={css`
          svg {
            font-size: 12.5px;
          }
        `}
        className="d-flex align-items-center"
      >
        <ContentEditable
          innerRef={contentEditable}
          html={html}
          disabled={disabled}
          onChange={(e) => {
            setHtml(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !disabled) {
              handleUpdateText();
            }
            if (e.keyCode === 27 && !disabled) {
              setHtml(text);
              setDisabled(true);
            }
          }}
          tagName="p"
          css={css`
            margin: 0;
            padding: 0;
            outline: 0px solid transparent;
          `}
        />
        {!disabled ? (
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
              handleUpdateText();
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
              setDisabled(false);
            }}
          />
        )}
      </div>
    </OnClickOutside>
  );
};

export default EditableText;
