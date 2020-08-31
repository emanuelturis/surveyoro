import Head from "next/head";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";

export default function Home() {
  return (
    <div
      css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: bold;
          text-align: center;
        `}
    >
      <Head>
        <title>Surveyrus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome To Surveyrus</h1>
      <p>Click below to create an account and start creating surveys.</p>
      <Button href="https://app.surveyrus.com/register">Create A New Account</Button>
    </div>
  );
}
