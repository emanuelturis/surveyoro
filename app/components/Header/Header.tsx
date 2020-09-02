import React, { useState } from "react";
import Link from "next/link";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

const Header: React.FC = () => {
  const Button = styled.a`
    display: inline-block;
    margin-top: 5px;
    padding: 15px 25px;
    background-color: #eaeaea;
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    font-size: 0.8em;
    color: #183642;
    opacity: 0.9;
    transition: all 125ms ease-in-out;
    &:hover {
      opacity: 1;
      color: #183642;
      text-decoration: none;
    }
  `;

  const [show, setShow] = useState(false);

  const links = [
    {
      text: "Features",
      url: "/features",
    },
    {
      text: "Login",
      url: "https://app.surveyoro.com/login",
    },
  ];
  return (
    <header
      css={css`
        background-color: #183642;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0px auto;
          padding: 1.45rem 1.0875rem;
          width: 1200px;
          @media (max-width: 768px) {
            width: 100%;
          }
        `}
      >
        <h1
          css={css`
            margin: 0;
            a {
              color: #f2fdff;
              text-decoration: none;
            }
          `}
        >
          <Link href="/">surveyoro</Link>
        </h1>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Button href="https://app.surveyoro.com/register">
            Register For Free
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
