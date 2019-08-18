import React, { Component } from "react";
import PageNavigation from "./../common/PageNavigation";
import SurveyContext from "../../context/SurveyContext";

class MTurkID extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null,
      duration: null,
      data: {
        id: ""
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

  onChange(key, value) {
    this.setState({
      data: {
        ...this.state.data,
        [key]: value
      }
    });
  }

  canSubmit() {
    return Object.values(this.state.data).every(v => !!v);
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
        await this.context.addUserResponse("mturk-id", this.state);
      }
    );
  }

  render() {
    return (
      <div>
        <p>Please enter your MTurk ID.</p>

        <input
          type="text"
          value={this.state.data["id"]}
          onChange={e => this.onChange("id", e.target.value)}
        />

        <PageNavigation
          disabled={!this.canSubmit()}
          disabledMsg="Please answer all questions"
          beforeNavigate={this.saveResults}
          to="/intro"
        />
      </div>
    );
  }
}

MTurkID.contextType = SurveyContext;

export default MTurkID;
