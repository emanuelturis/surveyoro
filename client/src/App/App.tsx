import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "../Header";
import Dashboard from "../Dashboard";
import Surveys from "../Surveys";
import Settings from "../Settings";
import { gql, useQuery } from "@apollo/client";
import Login from "../Login";
import Register from "../Register";
import { Container, Row } from "react-bootstrap";
import { css } from "@emotion/core";
import EditSurvey from "../Surveys/EditSurvey";
import Stats from "../Stats";
import { Global } from "@emotion/core";
import { Title } from "../Shared/Title";

const USER = gql`
  query User {
    user {
      id
      firstName
      lastName
      email
    }
  }
`;

function App() {
  const { data, loading } = useQuery(USER);

  if (loading) {
    return null;
  }

  if (data) {
    return (
      <div>
        <Global
          styles={css`
            @media (max-width: 768px) {
              p {
                font-size: 0.889em;
                word-break: break-all;
              }
            }
          `}
        />
        <Router>
          <Header />
          <Container
            css={css`
              margin-top: 25px;
              margin-bottom: 25px;
            `}
          >
            <Switch>
              <Route exact path="/" component={Surveys} />
              <Route exact path="/surveys/:id" component={EditSurvey} />
              <Route exact path="/surveys/:id/stats" component={Stats} />
              <Route exact path="/settings" component={Settings} />
              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
          </Container>
        </Router>
      </div>
    );
  }

  return (
    <div
      css={css`
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 100vh;
        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }
      `}
    >
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route>
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #eaeaea;
          height: 100vh;
          text-align: center;
          @media (max-width: 768px) {
            display: none;
          }
        `}
      >
        <div>
          <Title>Get Accurate Feedback.</Title>
          <p>
            All the tools you need to get feedback from your leads, fans and
            customers.
          </p>
          <img
            src="/surveyoro.png"
            alt=""
            css={css`
              width: 60%;
              box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
            `}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
