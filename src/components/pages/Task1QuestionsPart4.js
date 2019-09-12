import React, { Component } from "react";
import SurveyContext from "../../context/SurveyContext";
import RangeSlider from "../common/RangeSlider";
import PageNavigation from "../common/PageNavigation";

class Task1QuestionsPart4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null,
      duration: null,
      data: {
        "be-in-automobile-accident": null,
        "becoming-divorced": null,
        "becoming-depressed": null,
        "develop-drinking-problem": null,
        "being-mugged": null
      }
    };

    this.onChange = this.onChange.bind(this);
    this.saveResults = this.saveResults.bind(this);
  }

  componentDidMount() {
    this.setState({
      startTime: new Date()
    });
  }

  canSubmit() {
    return Object.values(this.state.data).every(v => !!v);
  }

  onChange(id, value) {
    this.setState({
      data: {
        ...this.state.data,
        [id]: value
      }
    });
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
          await this.context.addUserResponse("task1-questions4", this.state);
          resolve();
        }
      );
    });
  }

  render() {
    return (
      <div>
        <p>
          Rate the likelihood that{" "}
          <strong>the average college student of your gender</strong> will
          experience each of the following events:
        </p>

        <RangeSlider
          id="be-in-automobile-accident"
          text="Being in an automobile accident"
          min={-50}
          minLabel="Not at All Likely"
          max={50}
          maxLabel="Extremely Likely"
          value={this.state.data["be-in-automobile-accident"]}
          onChange={this.onChange}
        />

        <RangeSlider
          id="becoming-divorced"
          text="Becoming divorced"
          min={-50}
          minLabel="Not at All Likely"
          max={50}
          maxLabel="Extremely Likely"
          value={this.state.data["becoming-divorced"]}
          onChange={this.onChange}
        />

        <RangeSlider
          id="becoming-depressed"
          text="Becoming depressed"
          min={-50}
          minLabel="Not at All Likely"
          max={50}
          maxLabel="Extremely Likely"
          value={this.state.data["becoming-depressed"]}
          onChange={this.onChange}
        />

        <RangeSlider
          id="develop-drinking-problem"
          text="Developing a drinking problem"
          min={-50}
          minLabel="Not at All Likely"
          max={50}
          maxLabel="Extremely Likely"
          value={this.state.data["develop-drinking-problem"]}
          onChange={this.onChange}
        />

        <RangeSlider
          id="being-mugged"
          text="Being mugged"
          min={-50}
          minLabel="Not at All Likely"
          max={50}
          maxLabel="Extremely Likely"
          value={this.state.data["being-mugged"]}
          onChange={this.onChange}
        />

        <PageNavigation
          disabled={!this.canSubmit()}
          disabledMsg="Please answer all questions"
          beforeNavigate={this.saveResults}
          to="/task/1/outro"
        />
      </div>
    );
  }
}

Task1QuestionsPart4.contextType = SurveyContext;

export default Task1QuestionsPart4;
