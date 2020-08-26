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
import { Container } from "react-bootstrap";

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
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/surveys" component={Surveys} />
            <Route exact path="/settings" component={Settings} />
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

  return (
    <Container>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route>
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
