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
        "be-in-automobile-accident": 0,
        "becoming-divorced": 0,
        "becoming-depressed": 0,
        "develop-drinking-problem": 0,
        "being-mugged": 0
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

    this.setState(
      {
        startTime: this.state.startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration
      },
      async () => {
        await this.context.addUserResponse("task1.questions4", this.state);
      }
    );
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
          onChange={this.onChange}
        />

        <RangeSlider
          id="becoming-divorced"
          text="Becoming divorced"
          min={-50}
          minLabel="Not at All Likely"
          max={50}
          maxLabel="Extremely Likely"
          onChange={this.onChange}
        />

        <RangeSlider
          id="becoming-depressed"
          text="Becoming depressed"
          min={-50}
          minLabel="Not at All Likely"
          max={50}
          maxLabel="Extremely Likely"
          onChange={this.onChange}
        />

        <RangeSlider
          id="develop-drinking-problem"
          text="Developing a drinking problem"
          min={-50}
          minLabel="Not at All Likely"
          max={50}
          maxLabel="Extremely Likely"
          onChange={this.onChange}
        />

        <RangeSlider
          id="being-mugged"
          text="Being mugged"
          min={-50}
          minLabel="Not at All Likely"
          max={50}
          maxLabel="Extremely Likely"
          onChange={this.onChange}
        />

        <PageNavigation beforeNavigate={this.saveResults} to="/task/1/outro" />
      </div>
    );
  }
}

Task1QuestionsPart4.contextType = SurveyContext;

export default Task1QuestionsPart4;
