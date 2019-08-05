import React, { Component } from "react";
import PageNavigation from "../common/PageNavigation";
import SurveyContext from "../../context/SurveyContext";

class Task1Outro extends Component {
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

    this.setState(
      {
        startTime: this.state.startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration
      },
      async () => {
        await this.context.addUserResponse("task1-outro", this.state);
      }
    );
  }

  render() {
    return (
      <div>
        <p>
          You will now move onto the second task of this study. Please click
          next to begin Task 2.
        </p>

        <PageNavigation
          beforeNavigate={this.saveResults}
          to="/task/2/instructions"
        />
      </div>
    );
  }
}

Task1Outro.contextType = SurveyContext;

export default Task1Outro;
