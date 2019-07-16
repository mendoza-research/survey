import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Intro from "./pages/Intro";
import Task1Instructions from "./pages/Task1Instructions";
import Task1SelectProcedures from "./pages/Task1SelectProcedures";
import SurveyContext from "./../context/SurveyContext";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Page Title 333",
      userId: "abcdef"
    };
  }

  render() {
    return (
      <Router>
        <SurveyContext.Provider
          value={{ userId: "TEST_USER", pageTitle: "Page Title" }}
        >
          <Header />
          <div id="content-wrapper">
            <div id="content">
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
          </div>
        </SurveyContext.Provider>
      </Router>
    );
  }
}

export default App;
