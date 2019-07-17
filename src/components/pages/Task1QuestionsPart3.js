import React, { Component } from "react";
import SurveyContext from "../../context/SurveyContext";
import RangeSlider from "../common/RangeSlider";
import PageNavigation from "../common/PageNavigation";

class Task1QuestionsPart3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "be-in-automobile-accident": 0,
      "becoming-divorced": 0,
      "becoming-depressed": 0,
      "develop-drinking-problem": 0,
      "being-mugged": 0
    };

    this.onChange = this.onChange.bind(this);
    this.saveResults = this.saveResults.bind(this);
  }

  onChange(id, value) {
    this.setState({
      [id]: value
    });
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

        <PageNavigation
          beforeNavigate={this.saveResults}
          to="/task/1/questions/4"
        />
      </div>
    );
  }
}

Task1QuestionsPart3.contextType = SurveyContext;

export default Task1QuestionsPart3;
