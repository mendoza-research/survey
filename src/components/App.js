import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Intro from "./pages/Intro";
import Task1Instructions from "./pages/Task1Instructions";
import Task1SelectProcedures from "./pages/Task1SelectProcedures";
import SurveyContext from "./../context/SurveyContext";
import firebase from "./../firebase/firebase";
import Task1QuestionsPart1 from "./pages/Task1QuestionsPart1";
import Task1QuestionsPart2 from "./pages/Task1QuestionsPart2";
import Task1QuestionsPart3 from "./pages/Task1QuestionsPart3";
import Task1QuestionsPart4 from "./pages/Task1QuestionsPart4";
import Task1Outro from "./pages/Task1Outro";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "",
      userId: "TEST_USER",
      docRef: null
    };

    this.setPageTitle = this.setPageTitle.bind(this);
  }

  // Create a new document in database for the current user
  async componentDidMount() {
    await firebase.db
      .collection("responses")
      .add({
        userId: this.state.userId
      })
      .then(docRef => {
        console.log(docRef);
        this.setState({ docRef });
      })
      .catch(error =>
        console.error("Error creating a firebase document: ", error)
      );
  }

  setPageTitle(pageTitle) {
    this.setState({
      pageTitle
    });
  }

  render() {
    return (
      <Router>
        <SurveyContext.Provider
          value={{ ...this.state, setPageTitle: this.setPageTitle }}
        >
          <Header />
          <div id="content-wrapper">
            <div id="content">
              <Switch>
                <Route component={Intro} exact path="/" />
                <Route
                  component={Task1Instructions}
                  exact
                  path="/task/1/instructions"
                />
                <Route
                  component={Task1SelectProcedures}
                  exact
                  path="/task/1/select-procedures"
                />
                <Route
                  component={Task1QuestionsPart1}
                  exact
                  path="/task/1/questions/1"
                />
                <Route
                  component={Task1QuestionsPart2}
                  exact
                  path="/task/1/questions/2"
                />
                <Route
                  component={Task1QuestionsPart3}
                  exact
                  path="/task/1/questions/3"
                />
                <Route
                  component={Task1QuestionsPart4}
                  exact
                  path="/task/1/questions/4"
                />
                <Route component={Task1Outro} exact path="/task/1/outro" />
              </Switch>
            </div>
          </div>
        </SurveyContext.Provider>
      </Router>
    );
  }
}

export default App;
