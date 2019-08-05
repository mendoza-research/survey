import React, { Component } from "react";
import SurveyContext from "../../context/SurveyContext";
import RangeSlider from "../common/RangeSlider";
import PageNavigation from "../common/PageNavigation";

class Task1QuestionsPart2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null,
      duration: null,
      data: {
        "complete-schoolwork-promptly": 0,
        "attend-all-classes": 0,
        "spend-more-time-at-the-library": 0,
        "be-prepared-for-tests": 0,
        "increase-motivation": 0
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
        await this.context.addUserResponse("task1-questions2", this.state);
      }
    );
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

        <RangeSlider
          id="complete-schoolwork-promptly"
          text="Complete schoolwork promptly"
          min={-50}
          minLabel="Not at All Enjoyable"
          max={50}
          maxLabel="Extremely Enjoyable"
          onChange={this.onChange}
        />

        <RangeSlider
          id="attend-all-classes"
          text="Attend all classes"
          min={-50}
          minLabel="Not at All Enjoyable"
          max={50}
          maxLabel="Extremely Enjoyable"
          onChange={this.onChange}
        />

        <RangeSlider
          id="spend-more-time-at-the-library"
          text="Spend more time at the library"
          min={-50}
          minLabel="Not at All Enjoyable"
          max={50}
          maxLabel="Extremely Enjoyable"
          onChange={this.onChange}
        />

        <RangeSlider
          id="be-prepared-for-tests"
          text="Be prepared for tests"
          min={-50}
          minLabel="Not at All Enjoyable"
          max={50}
          maxLabel="Extremely Enjoyable"
          onChange={this.onChange}
        />

        <RangeSlider
          id="increase-motivation"
          text="Increase motivation to earn high GPA"
          min={-50}
          minLabel="Not at All Enjoyable"
          max={50}
          maxLabel="Extremely Enjoyable"
          onChange={this.onChange}
        />

        <PageNavigation
          beforeNavigate={this.saveResults}
          to="/task/1/questions/3"
        />
      </div>
    );
  }
}

Task1QuestionsPart2.contextType = SurveyContext;

export default Task1QuestionsPart2;
