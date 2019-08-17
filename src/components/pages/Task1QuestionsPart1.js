import React, { Component } from "react";
import SurveyContext from "../../context/SurveyContext";
import RangeSlider from "../common/RangeSlider";
import PageNavigation from "../common/PageNavigation";

class Task1QuestionsPart1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null,
      duration: null,
      data: {
        "how-well": 0,
        "how-likely-to-pass": 0,
        "what-grade": 73,
        "how-difficult-earn-b-or-higher": 0,
        "how-useful-professor-advice": 0,
        "how-much-discretion": 0
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
        await this.context.addUserResponse("task1-questions1", this.state);
      }
    );
  }

  render() {
    return (
      <div>
        <h2>Please answer the following questions about Task 1. </h2>

        <RangeSlider
          id="how-well"
          text="In general, if you perform only the procedures you chose, how well do you think you will do in the class?"
          min={-50}
          minLabel="Not At All Well"
          max={50}
          maxLabel="Very Well"
          onChange={this.onChange}
        />

        <RangeSlider
          id="how-likely-to-pass"
          text="In general, if you perform only the procedures you chose, how likely are you to pass the class with a B (80 percent) or higher?"
          min={-50}
          minLabel="Not At All Likely"
          max={50}
          maxLabel="Very Likely"
          onChange={this.onChange}
        />

        <RangeSlider
          id="what-grade"
          text="Given the steps you chose, what grade (in percentage) do you think you will earn?"
          min={45}
          max={100}
          step={5}
          customMarks={{
            45: "Less than 50%",
            50: "50%",
            60: "60%",
            70: "70%",
            80: "80%",
            90: "90%",
            100: "100%"
          }}
          onChange={this.onChange}
        />

        <RangeSlider
          id="how-difficult-earn-b-or-higher"
          text="How difficult do you believe earning a B or higher will be?"
          min={-50}
          minLabel="Not At All Difficult"
          max={50}
          maxLabel="Very Difficult"
          onChange={this.onChange}
        />

        <RangeSlider
          id="how-useful-professor-advice"
          text="How useful was the professor's advice in the syllabus about how to earn a B in the class?"
          min={-50}
          minLabel="Not At All Useful"
          max={50}
          maxLabel="Very Useful"
          onChange={this.onChange}
        />

        <RangeSlider
          id="how-much-discretion"
          text="How much discretion did you feel you had when choosing what procedures to take?"
          min={-50}
          minLabel="Very little discretion"
          max={50}
          maxLabel="A lot of discretion"
          onChange={this.onChange}
        />

        <PageNavigation
          beforeNavigate={this.saveResults}
          to="/task/1/questions/2"
        />
      </div>
    );
  }
}

Task1QuestionsPart1.contextType = SurveyContext;

export default Task1QuestionsPart1;
