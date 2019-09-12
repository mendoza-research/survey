import React, { Component } from "react";
import PageNavigation from "../common/PageNavigation";
import SurveyContext from "../../context/SurveyContext";
import Checkmark from "../common/Checkmark";

class Task2WordsPurpose extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null,
      duration: null,
      data: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveResults = this.saveResults.bind(this);
  }

  componentDidMount() {
    this.setState({
      startTime: new Date()
    });
  }

  handleChange(event) {
    this.setState({
      data: event.target.value
    });
  }

  canSubmit() {
    return this.state.data;
  }

  async saveResults() {
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
          await this.context.addUserResponse("task2-words-purpose", this.state);
          resolve();
        }
      );
    });
  }

  render() {
    return (
      <div>
        <p className="question-text">
          <Checkmark show={this.state.data !== ""} />
          You have completed Task 2. During Task 2, you may have noticed some
          words appearing on your screen. What purpose do you think these words
          serve in the task?
        </p>

        <textarea value={this.state.value} onChange={this.handleChange} />

        <PageNavigation
          disabled={!this.canSubmit()}
          disabledMsg="Please answer the question"
          beforeNavigate={this.saveResults}
          to="/task/2/word-recall-questions"
        />
      </div>
    );
  }
}

Task2WordsPurpose.contextType = SurveyContext;

export default Task2WordsPurpose;
