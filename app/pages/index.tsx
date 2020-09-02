import Head from "next/head";
import { css } from "@emotion/core";
import Header from "../components/Header";
import Features from "../components/Features";
import styled from "@emotion/styled";

export default function Home() {
  const Button = styled.a`
    display: inline-block;
    margin-top: 5px;
    padding: 15px 25px;
    background-color: #313d5a;
    border-radius: 5px;
    text-decoration: none;
    color: #eaeaea;
    opacity: 0.9;
    transition: all 125ms ease-in-out;
    &:hover {
      opacity: 1;
      color: #eaeaea;
      text-decoration: none;
    }
  `;

  return (
    <div
      css={css`
        font-family: Poppins;
      `}
    >
      <Head>
        <title>Surveyrus</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: 50vh;
          background-color: #eaeaea;
        `}
      >
        <div>
          <h1>Get Accurate Feedback.</h1>
          <p>
            All the tools you need to get feedback from your leads, fans and
            customers.
          </p>
          <Button
            css={css`
              background-color: #313d5a;
              border: 0;
              opacity: 0.9;
              color: #eaeaea;
              transition: all 125ms ease-in-out;
              &:hover {
                background-color: #313d5a;
                opacity: 1;
              }
            `}
            href="https://app.surveyrus.com/register"
          >
            Create A Free Account
          </Button>
        </div>
      </div>
      <Features />
      <div
        css={css`
          margin-top: 25px;
          padding: 0 1em;
          height: 50vh;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          background-color: #eaeaea;
        `}
      >
        <div>
          <h4>Create A Free Account </h4>
          <p>
            Click below to create a new Surveyrus account and start getting
            feedback from your audience today.
          </p>
          <Button href="https://app.surveyrus.com/register">
            Register For Free
          </Button>
        </div>
      </div>
      <footer
        css={css`
          display: flex;
          justify-content: center;
          padding: 35px;
        `}
      >
        © {new Date().getFullYear()} | Surveyrus
        {` `}
      </footer>
    </div>
  );
}
