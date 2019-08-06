import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import ScrollToTop from "./common/ScrollToTop";
import Task2Instructions from "./pages/Task2Instructions";
import Task2Quiz from "./pages/Task2Quiz";
import Task2WordsPurpose from "./pages/Task2WordsPurpose";
import Task2WordRecallQuestions from "./pages/Task2WordRecallQuestions";
import PostExperimentalQuestions from "./pages/PostExperimentalQuestions";
import GeneralQuestions from "./pages/GeneralQuestions";
import Outro from "./pages/Outro";
import Admin from "./pages/Admin";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      endTime: null,
      duration: null,
      pages: {}
    };

    this.addUserResponse = this.addUserResponse.bind(this);
    this.submitUserResponse = this.submitUserResponse.bind(this);
    this.getUserResponse = this.getUserResponse.bind(this);
  }

  componentDidMount() {
    this.setState({
      startTime: new Date()
    });
  }

  addUserResponse(pageName, data) {
    this.setState(
      {
        pages: {
          ...this.state.pages,
          [pageName]: data
        }
      },
      () => {
        console.log(this.state);
      }
    );
  }

  getUserResponse() {
    return this.state;
  }

  async submitUserResponse() {
    const endTime = new Date();
    const duration = (endTime - this.state.startTime) / 1000;

    this.setState(
      {
        startTime: this.state.startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration
      },
      async () => {
        await firebase.db
          .collection("responses")
          .add(this.state)
          .then(console.log("Submit complete"))
          .catch(error =>
            console.error("Error creating a firebase document: ", error)
          );
      }
    );
  }

  render() {
    return (
      <Router>
        <ScrollToTop>
          <SurveyContext.Provider
            value={{
              ...this.state,
              addUserResponse: this.addUserResponse,
              submitUserResponse: this.submitUserResponse,
              getUserResponse: this.getUserResponse
            }}
          >
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
                  <Route
                    component={Task2Instructions}
                    exact
                    path="/task/2/instructions"
                  />
                  <Route component={Task2Quiz} exact path="/task/2/quiz" />
                  <Route
                    component={Task2WordsPurpose}
                    exact
                    path="/task/2/words-purpose"
                  />
                  <Route
                    component={Task2WordRecallQuestions}
                    exact
                    path="/task/2/word-recall-questions"
                  />
                  <Route
                    component={PostExperimentalQuestions}
                    exact
                    path="/post-experimental-questions"
                  />
                  <Route
                    component={GeneralQuestions}
                    exact
                    path="/general-questions"
                  />
                  <Route component={Outro} exact path="/outro" />
                  <Route component={Admin} exact path="/admin" />
                </Switch>
              </div>
            </div>
          </SurveyContext.Provider>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
