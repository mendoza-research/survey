import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SurveyContext from "../../context/SurveyContext";
import StringBlock from "../common/StringBlock";
import quizStrings from "../../data/task2_strings_test.json";

const Mousetrap = require("mousetrap");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const SHOW_STRING = "SHOW_STRING";
const SHOW_BLANK_SCREEN = "SHOW_BLANK_SCREEN";
const SHOW_WORD = "SHOW_WORD";
const answerKeys = ["4", "5", "6", "7"];

class Task2Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null,
      duration: null,
      currentIndex: 0,
      displayMode: SHOW_STRING,
      data: []
    };

    // To prevent key press being fired continuously when user keeps pressing the key
    this.isKeyPressed = false;
    this.currentStringStartTime = null;

    this.saveResults = this.saveResults.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  componentDidMount() {
    this.setState({
      startTime: new Date()
    });

    this.currentStringStartTime = new Date();
    this.bindKeys();
  }

  componentWillUnmount() {
    this.unbindKeys();
  }

  async saveResults() {
    const endTime = new Date();
    const duration = (endTime - this.state.startTime) / 1000;

    this.setState(
      {
        startTime: this.state.startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration
      },
      async () => {
        await this.context.addUserResponse("task2.quiz", {
          startTime: this.state.startTime,
          endTime: this.state.endTime,
          duration: this.state.duration,
          data: this.state.data
        });
      }
    );
  }

  bindKeys() {
    answerKeys.forEach(key => {
      Mousetrap.bind(key, e => {
        e.preventDefault();

        if (this.isKeyPressed) {
          return;
        }

        this.handleKeypress(key);
      });
    });
  }

  unbindKeys() {
    answerKeys.forEach(key => {
      Mousetrap.unbind(key);
    });
  }

  async handleKeypress(key) {
    this.setState(
      (state, props) => {
        return {
          data: [
            ...state.data,
            {
              answer: Number.parseInt(key),
              duration: (new Date() - this.currentStringStartTime) / 1000
            }
          ]
        };
      },
      async () => {
        // Show blank screen for 1 second
        this.setState({
          displayMode: SHOW_BLANK_SCREEN
        });

        await sleep(1000);

        // If a word to flash exists, show it for 300 milliseconds
        if (quizStrings[this.state.currentIndex].hasOwnProperty("word")) {
          this.setState({
            displayMode: SHOW_WORD
          });

          await sleep(300);
        }

        // Move to next string if not the last index
        if (this.state.currentIndex < quizStrings.length - 1) {
          this.setState(
            state => ({
              currentIndex: state.currentIndex + 1,
              displayMode: SHOW_STRING
            }),
            () => {
              this.currentStringStartTime = new Date();
            }
          );
        }

        // If the last index, save results and move to next page
        else {
          await this.saveResults();
          this.props.history.push("/task/2/words-purpose");
        }

        console.log(this.state.data);
      }
    );
  }

  render() {
    const { currentIndex, displayMode } = this.state;

    const quizString = quizStrings[currentIndex];
    const word = quizStrings[currentIndex].hasOwnProperty("word")
      ? quizStrings[currentIndex].word
      : null;

    return (
      <div className="task2-quiz">
        {displayMode === SHOW_STRING && (
          <StringBlock
            string={quizString.string}
            top={quizString.top}
            bottom={quizString.bottom}
          />
        )}

        {displayMode === SHOW_WORD && <div className="word">{word}</div>}
      </div>
    );
  }
}

Task2Quiz.contextType = SurveyContext;

export default withRouter(Task2Quiz);
