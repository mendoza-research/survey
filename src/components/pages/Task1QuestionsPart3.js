import React, { Component } from "react";
import SurveyContext from "../../context/SurveyContext";
import RangeBar from "../common/RangeBar";
import PageNavigation from "../common/PageNavigation";

class Task1QuestionsPart3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "be-in-automobile-accident": null,
      "becoming-divorced": null,
      "becoming-depressed": null,
      "develop-drinking-problem": null,
      "being-mugged": null
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
      "task1.questions3": this.state
    });
  }

  render() {
    return (
      <div>
        <p>
          Rate the likelihood that <strong>you</strong> will experience each of
          the following events:
        </p>

        <RangeBar
          id="be-in-automobile-accident"
          text="Being in an automobile accident"
          min={-50}
          minLabel="Not at All Likely"
          max={50}
          maxLabel="Extremely Likely"
          step={10}
          onChange={this.onChange}
        />

        <RangeBar
          id="becoming-divorced"
          text="Becoming divorced"
          min={-50}
          minLabel="Not at All Likely"
          max={50}
          maxLabel="Extremely Likely"
          step={10}
          onChange={this.onChange}
        />

        <RangeBar
          id="becoming-depressed"
          text="Becoming depressed"
          min={-50}
          minLabel="Not at All Likely"
          max={50}
          maxLabel="Extremely Likely"
          step={10}
          onChange={this.onChange}
        />

        <RangeBar
          id="develop-drinking-problem"
          text="Developing a drinking problem"
          min={-50}
          minLabel="Not at All Likely"
          max={50}
          maxLabel="Extremely Likely"
          step={10}
          onChange={this.onChange}
        />

        <RangeBar
          id="being-mugged"
          text="Being mugged"
          min={-50}
          minLabel="Not at All Likely"
          max={50}
          maxLabel="Extremely Likely"
          step={10}
          onChange={this.onChange}
        />

        <PageNavigation
          disabled={!this.canSubmit()}
          disabledMsg="Please fill out all required fields"
          beforeNavigate={this.saveResults}
          to="/task/1/questions/4"
        />
      </div>
    );
  }
}

Task1QuestionsPart3.contextType = SurveyContext;

export default Task1QuestionsPart3;
