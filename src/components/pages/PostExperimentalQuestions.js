import React, { Component } from "react";
import SurveyContext from "../../context/SurveyContext";
import RangeSlider from "../common/RangeSlider";
import PageNavigation from "../common/PageNavigation";

class PostExperimentalQuestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null,
      duration: null,
      data: {
        "how-motivated": undefined,
        "focus-accuracy-or-speed": undefined,
        "how-accurate": undefined,
        "performance-satisfaction": undefined,
        "right-strategy": undefined,
        "enjoy-task": undefined
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

  canSubmit() {
    return Object.values(this.state.data).every(v => v !== undefined);
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
          await this.context.addUserResponse(
            "post-experimental-questions",
            this.state
          );

          resolve();
        }
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Post-Experimental Questions</h2>

        <p>
          <strong>
            Please answer the following questions regarding the task you just
            completed (Task 2, in which you counted d's with two apostrophes).
          </strong>
        </p>

        <RangeSlider
          id="how-motivated"
          text="Did you feel like you were motivated to complete the counting task?"
          min={0}
          minLabel="Not at all motivated"
          centerLabel="Somewhat Motivated"
          max={100}
          maxLabel="Somewhat Motivated"
          value={this.state.data["how-motivated"]}
          onChange={this.onChange}
        />

        <RangeSlider
          id="focus-accuracy-or-speed"
          text="When completing this task, were you more focused on accuracy or speed?"
          min={0}
          minLabel="Much more motivated by accuracy"
          centerLabel="Equally motivated by accuracy and speed"
          max={100}
          maxLabel="Much more motivated by speed"
          value={this.state.data["focus-accuracy-or-speed"]}
          onChange={this.onChange}
        />

        <RangeSlider
          id="how-accurate"
          text="What percentage of the strings of d's and p's do you think you accurately counted the number of d's with two apostrophes?"
          min={0}
          minLabel="0% Accuracy"
          max={100}
          maxLabel="100% Accuracy"
          value={this.state.data["how-accurate"]}
          onChange={this.onChange}
        />

        <RangeSlider
          id="performance-satisfaction"
          text="Do you feel satisfied with your performance on this task?"
          min={0}
          minLabel="Not At All Satisfied"
          centerLabel="Somewhat Satisfied"
          max={100}
          maxLabel="Very Satisfied"
          value={this.state.data["performance-satisfaction"]}
          onChange={this.onChange}
        />

        <RangeSlider
          id="right-strategy"
          text='Do you feel like you used the "right" strategy when completing the counting task?'
          min={0}
          minLabel="Not at all Right"
          centerLabel="Somewhat Right"
          max={100}
          maxLabel="Very Right"
          value={this.state.data["right-strategy"]}
          onChange={this.onChange}
        />

        <RangeSlider
          id="enjoy-task"
          text="Did you enjoy completing the counting task?"
          min={0}
          minLabel="Not at all Enjoyed"
          centerLabel="Somewhat Enjoyed"
          max={100}
          maxLabel="Very Much Enjoyed"
          value={this.state.data["enjoy-task"]}
          onChange={this.onChange}
        />

        <PageNavigation
          disabled={!this.canSubmit()}
          disabledMsg="Please answer all questions"
          beforeNavigate={this.saveResults}
          to="/general-questions"
        />
      </div>
    );
  }
}

PostExperimentalQuestions.contextType = SurveyContext;

export default PostExperimentalQuestions;
