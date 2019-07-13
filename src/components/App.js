import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Intro from "./pages/Intro";
import Task1Instructions from "./pages/Task1Instructions";
import Task1SelectProcedures from "./pages/Task1SelectProcedures";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="content">
          <Switch>
            <Route component={Intro} exact path="/" />
            <Route
              component={Task1Instructions}
              exact
              path="/task1/instructions"
            />
            <Route
              component={Task1SelectProcedures}
              exact
              path="/task1/select-procedures"
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
