import React, { Component } from "react";
import SurveyContext from "../../context/SurveyContext";
import RangeBar from "../common/RangeBar";
import PageNavigation from "../common/PageNavigation";

class Task1QuestionsPart2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "complete-schoolwork-promptly": null,
      "attend-all-classes": null,
      "spend-more-time-at-the-library": null,
      "be-prepared-for-tests": null,
      "increase-motivation": null
    };

    this.onChange = this.onChange.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
    this.saveResults = this.saveResults.bind(this);
  }

  onChange(id, value) {
    this.setState({
      [id]: value
    });
  }

  canSubmit() {
    return Object.values(this.state).every(v => v !== null);
  }

  async saveResults() {
    await this.context.docRef.update({
      "task1.questions2": this.state
    });
  }

  render() {
    return (
      <div>
        <p>
          Listed below are several strategies that can be used to attain the
          goal of "earning a high GPA."
          <br />
          Please indicate how enjoyable each strategy would be to carry out.
        </p>

        <RangeBar
          id="complete-schoolwork-promptly"
          text="Complete schoolwork promptly"
          min={-50}
          minLabel="Not at All Enjoyable"
          max={50}
          maxLabel="Extremely Enjoyable"
          step={10}
          onChange={this.onChange}
        />

        <RangeBar
          id="attend-all-classes"
          text="Attend all classes"
          min={-50}
          minLabel="Not at All Enjoyable"
          max={50}
          maxLabel="Extremely Enjoyable"
          step={10}
          onChange={this.onChange}
        />

        <RangeBar
          id="spend-more-time-at-the-library"
          text="Spend more time at the library"
          min={-50}
          minLabel="Not at All Enjoyable"
          max={50}
          maxLabel="Extremely Enjoyable"
          step={10}
          onChange={this.onChange}
        />

        <RangeBar
          id="be-prepared-for-tests"
          text="Be prepared for tests"
          min={-50}
          minLabel="Not at All Enjoyable"
          max={50}
          maxLabel="Extremely Enjoyable"
          step={10}
          onChange={this.onChange}
        />

        <RangeBar
          id="increase-motivation"
          text="Increase motivation to earn high GPA"
          min={-50}
          minLabel="Not at All Enjoyable"
          max={50}
          maxLabel="Extremely Enjoyable"
          step={10}
          onChange={this.onChange}
        />

        <PageNavigation
          disabled={!this.canSubmit()}
          disabledMsg="Please fill out all required fields"
          beforeNavigate={this.saveResults}
          to="/task/1/questions/3"
        />
      </div>
    );
  }
}

Task1QuestionsPart2.contextType = SurveyContext;

export default Task1QuestionsPart2;
