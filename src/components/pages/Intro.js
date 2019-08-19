import React, { Component } from "react";
import PageNavigation from "../common/PageNavigation";
import SurveyContext from "../../context/SurveyContext";

class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null,
      duration: null
    };

    this.saveResults = this.saveResults.bind(this);
  }

  componentDidMount() {
    this.setState({
      startTime: new Date()
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
          await this.context.addUserResponse("intro", this.state);
          resolve();
        }
      );
    });
  }

  render() {
    return (
      <div>
        <p>
          Thank you for agreeing to participate in our study, which is comprised
          of two separate tasks.
        </p>

        <p>Please click next to begin Task 1.</p>

        <PageNavigation
          beforeNavigate={this.saveResults}
          to="/task/1/instructions"
        />
      </div>
    );
  }
}

Intro.contextType = SurveyContext;

export default Intro;
