import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SurveyContext from "../../context/SurveyContext";
import quizStrings from "../../data/task2_strings.json";
import words from "../../data/task2_word_recall_questions.json";

class Task2WordRecallQuestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null,
      duration: null,
      currentIndex: 0,
      numCorrect: 0,
      data: []
    };

    this.currentWordStartTime = null;

    this.saveResults = this.saveResults.bind(this);
  }

  componentDidMount() {
    this.setState({
      startTime: new Date()
    });

    this.currentWordStartTime = new Date();
  }

  async saveResults() {
    const endTime = new Date();
    const duration = (endTime - this.state.startTime) / 1000;

    return new Promise((resolve, reject) => {
      const flashedWords = quizStrings.reduce((wordsAcc, block) => {
        return block.hasOwnProperty("word")
          ? [...wordsAcc, block.word]
          : wordsAcc;
      }, []);

      const numCorrect = this.state.data.reduce(
        (accNumCorrect, answerObj, idx) => {
          return (
            accNumCorrect +
            ((answerObj.seen && flashedWords.includes(words[idx])) ||
              (!answerObj.seen && !flashedWords.includes(words[idx])))
          );
        },
        0
      );

      this.setState(
        {
          startTime: this.state.startTime.toISOString(),
          endTime: endTime.toISOString(),
          numCorrect,
          duration
        },
        async () => {
          await this.context.addUserResponse("task2-word-recall-questions", {
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            duration: this.state.duration,
            numCorrect: this.state.numCorrect,
            data: this.state.data
          });

          resolve();
        }
      );
    });
  }

  async saveAnswer(val) {
    this.setState(
      (state, props) => {
        return {
          data: [
            ...state.data,
            {
              seen: val,
              duration: (new Date() - this.currentWordStartTime) / 1000
            }
          ]
        };
      },
      async () => {
        // Move to next string if not the last index
        if (this.state.currentIndex < words.length - 1) {
          this.setState(
            state => ({
              currentIndex: state.currentIndex + 1
            }),
            () => {
              this.currentWordStartTime = new Date();
            }
          );
        }

        // If the last index, save results and move to next page
        else {
          await this.saveResults();
          this.props.history.push("/post-experimental-questions");
        }
      }
    );
  }

  render() {
    const { currentIndex } = this.state;

    const word = words[currentIndex];

    return (
      <div className="task2-words-recall-questions">
        {currentIndex === 0 && (
          <p>
            In the following screens, you will be asked to indicate whether each
            word was presented in Task 2 that you just completed. Please answer
            these questions as quickly as you could.
          </p>
        )}

        <p>Was the word below presented in Task 2?</p>

        <div className="word">{word}</div>

        <div className="clickable" onClick={() => this.saveAnswer(true)}>
          Yes
        </div>
        <div className="clickable" onClick={() => this.saveAnswer(false)}>
          No
        </div>
      </div>
    );
  }
}

Task2WordRecallQuestions.contextType = SurveyContext;

export default withRouter(Task2WordRecallQuestions);
