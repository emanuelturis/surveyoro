import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../Header";
import Dashboard from "../Dashboard";
import Surveys from "../Surveys";
import Settings from "../Settings";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/surveys" component={Surveys} />
          <Route exact path="/settings" component={Settings} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
