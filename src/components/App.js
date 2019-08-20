import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import posed, { PoseGroup } from "react-pose";
import Intro from "./pages/Intro";
import Task1Instructions from "./pages/Task1Instructions";
import Task1SelectProcedures from "./pages/Task1SelectProcedures";
import SurveyContext from "./../context/SurveyContext";
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
import MTurkID from "./pages/MTurkID";

const axios = require("axios");
// axios.defaults.baseURL =
//   "https://us-central1-kimendoz-survey.cloudfunctions.net/app";
axios.defaults.baseURL =
  "http://localhost:5000/kimendoz-survey/us-central1/app";

const customHistory = createBrowserHistory();

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      endTime: null,
      duration: null,
      pages: {}
    };

    this.currentPathname = "/";
    this.addUserResponse = this.addUserResponse.bind(this);
    this.submitUserResponse = this.submitUserResponse.bind(this);
  }

  componentDidMount() {
    this.setState({
      startTime: new Date()
    });

    // Prevent back button
    window.onpopstate = e => {
      customHistory.go(1);
    };

    // If a participant has navigated to a new pathname,
    // push the new pathname to history stack
    // This part of the code is necessary to preserve state when a participant
    // accidentally clicks on the back button
    customHistory.listen((location, action) => {
      if (location.pathname !== this.currentPathname) {
        this.currentPathname = location.pathname;

        customHistory.push(location.pathname);
      }
    });
  }

  addUserResponse(pageName, data) {
    return new Promise((resolve, reject) => {
      this.setState(
        {
          pages: {
            ...this.state.pages,
            [pageName]: data
          }
        },
        () => {
          resolve();
        }
      );
    });
  }

  async submitUserResponse() {
    const endTime = new Date();
    const duration = (endTime - this.state.startTime) / 1000;

    return new Promise((resolve, reject) => {
      this.setState(
        {
          startTime: this.state.startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration
        },
        async () => {
          try {
            const response = await axios.post("/submit-response", this.state);

            resolve(response);
          } catch (e) {
            reject(e);
          }
        }
      );
    });
  }

  render() {
    return (
      <Router history={customHistory}>
        <ScrollToTop>
          <SurveyContext.Provider
            value={{
              ...this.state,
              addUserResponse: this.addUserResponse,
              submitUserResponse: this.submitUserResponse
            }}
          >
            <div id="content-wrapper">
              <div id="content">
                <Route
                  render={({ location }) => (
                    <PoseGroup>
                      <RouteContainer key={location.pathname}>
                        <Switch location={location}>
                          <Route
                            component={MTurkID}
                            exact
                            path="/"
                            key="home"
                          />
                          <Route
                            component={Intro}
                            exact
                            path="/intro"
                            key="intro"
                          />
                          <Route
                            component={Task1Instructions}
                            exact
                            path="/task/1/instructions"
                            key="task1-instructions"
                          />
                          <Route
                            component={Task1SelectProcedures}
                            exact
                            path="/task/1/select-procedures"
                            key="task1-select-procedures"
                          />
                          <Route
                            component={Task1QuestionsPart1}
                            exact
                            path="/task/1/questions/1"
                            key="task1-questions1"
                          />
                          <Route
                            component={Task1QuestionsPart2}
                            exact
                            path="/task/1/questions/2"
                            key="task1-questions2"
                          />
                          <Route
                            component={Task1QuestionsPart3}
                            exact
                            path="/task/1/questions/3"
                            key="task1-questions3"
                          />
                          <Route
                            component={Task1QuestionsPart4}
                            exact
                            path="/task/1/questions/4"
                            key="task1-questions4"
                          />
                          <Route
                            component={Task1Outro}
                            exact
                            path="/task/1/outro"
                            key="task1-outro"
                          />
                          <Route
                            component={Task2Instructions}
                            exact
                            path="/task/2/instructions"
                            key="task2-instructions"
                          />
                          <Route
                            component={Task2Quiz}
                            exact
                            path="/task/2/quiz"
                            key="task2-quiz"
                          />
                          <Route
                            component={Task2WordsPurpose}
                            exact
                            path="/task/2/words-purpose"
                            key="task2-words-purpose"
                          />
                          <Route
                            component={Task2WordRecallQuestions}
                            exact
                            path="/task/2/word-recall-questions"
                            key="task2-word-recall-questions"
                          />
                          <Route
                            component={PostExperimentalQuestions}
                            exact
                            path="/post-experimental-questions"
                            key="post-experimental-questions"
                          />
                          <Route
                            component={GeneralQuestions}
                            exact
                            path="/general-questions"
                            key="general-questions"
                          />
                          <Route
                            component={Outro}
                            exact
                            path="/outro"
                            key="outro"
                          />
                          <Route
                            component={Admin}
                            exact
                            path="/admin"
                            key="admin"
                          />
                        </Switch>
                      </RouteContainer>
                    </PoseGroup>
                  )}
                />
              </div>
            </div>
          </SurveyContext.Provider>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
