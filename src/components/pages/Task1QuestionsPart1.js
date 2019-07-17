import React, { Component } from "react";
import SurveyContext from "../../context/SurveyContext";
import RangeBar from "../common/RangeBar";
import PageNavigation from "../common/PageNavigation";

class Task1QuestionsPart1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "how-well": null,
      "how-likely-to-pass": null,
      "what-grade": null,
      "how-difficult-earn-b-or-higher": null,
      "how-useful-professor-advice": null,
      "how-much-discretion": null
    };

    this.onChange = this.onChange.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
    this.saveResults = this.saveResults.bind(this);
  }

  componentDidMount() {
    this.context.setPageTitle("Task 1 - Questions");
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
      "task1.questions1": this.state
    });
  }

  render() {
    return (
      <div>
        <h2>Please answer the following questions about Task 1. </h2>

        <RangeBar
          id="how-well"
          text="In general, if you perform only the procedures you chose, how well do you think you will do in the class?"
          min={-50}
          minLabel="Not At All Well"
          max={50}
          maxLabel="Very Well"
          step={10}
          onChange={this.onChange}
        />

        <RangeBar
          id="how-likely-to-pass"
          text="In general, if you perform only the procedures you chose, how likely are you to pass the class with a B (80 percent) or higher?"
          min={-50}
          minLabel="Not At All Likely"
          max={50}
          maxLabel="Very Likely"
          step={10}
          onChange={this.onChange}
        />

        <RangeBar
          id="what-grade"
          text="Given the steps you chose, what grade (in percentage) do you think you will earn? "
          marks={["Less than 50%", "50%", "60%", "70%", "80%", "90%", "100%"]}
          onChange={this.onChange}
        />

        <RangeBar
          id="how-difficult-earn-b-or-higher"
          text="How difficult do you believe earning a B or higher will be?"
          min={-50}
          minLabel="Not At All Difficult"
          max={50}
          maxLabel="Very Difficult"
          step={10}
          onChange={this.onChange}
        />

        <RangeBar
          id="how-useful-professor-advice"
          text="How useful was the professor's advice about how to earn a B in the class?"
          min={-50}
          minLabel="Not At All Useful"
          max={50}
          maxLabel="Very Useful"
          step={10}
          onChange={this.onChange}
        />

        <RangeBar
          id="how-much-discretion"
          text="How much discretion did you feel you had when choosing what procedures to take?"
          min={-50}
          minLabel="Very little discretion"
          max={50}
          maxLabel="A lot of discretion"
          step={10}
          onChange={this.onChange}
        />

        <PageNavigation
          disabled={!this.canSubmit()}
          disabledMsg="Please fill out all required fields"
          beforeNavigate={this.saveResults}
          to="/task/1/questions/2"
        />
      </div>
    );
  }
}

Task1QuestionsPart1.contextType = SurveyContext;

export default Task1QuestionsPart1;
