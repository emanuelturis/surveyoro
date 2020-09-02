import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

const Features: React.FC = () => {
  const features = [
    {
      title: "Quick Feedback.",
      description: `Knowing your audience is key. With Surveyrus you can quickly get feedback with an easy to use interface that allows you to quickly build and visualize your survey.`,
      image: "/surveyrus.png",
    },
    {
      title: "Ease Of Use.",
      description: `Surveyrus is an easy to use platform that helps you get your surveys out quickly.`,
      image: "/draganddrop.png",
    },
    {
      title: "Different Types Of Questions.",
      description: `Looking for different types of feedback? We got the right tools for you.`,
      image: "/typesofquestions.png",
    },
  ];

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
        width: 960px;
        margin: auto;
        @media (max-width: 768px) {
          width: 100%;
        }
      `}
      id="features"
    >
      <h1
        css={css`
          margin-top: 50px;
          text-align: center;
        `}
      >
        Features
      </h1>
      {features.map((feature, index) => (
        <div
          key={index}
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 25px;
            align-items: center;
            margin-top: 50px;
            height: 25vh;
            text-align: center;
            img {
              width: 100%;
              grid-row: ${index & 1 ? index : "auto"};
            }
            @media (max-width: 768px) {
              height: auto;
              grid-template-columns: 1fr;
              padding: 0 1rem;
              img {
                grid-row: auto;
              }
            }
          `}
        >
          <div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <Button href="https://app.surveyrus.com/register">
              Register For Free
            </Button>
          </div>
          <img src={feature.image} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Features;
