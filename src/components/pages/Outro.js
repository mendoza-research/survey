import React, { Component } from "react";
import SurveyContext from "../../context/SurveyContext";

class Outro extends Component {
  render() {
    return (
      <div>
        <p>
          <strong>
            You have completed the study. Thank you for your participation!
          </strong>
        </p>

        <div className="debug-box">
          <p>Debug Information (will be hidden in production).</p>
          <pre>{JSON.stringify(this.context.getUserResponse(), null, 2)}</pre>
        </div>
      </div>
    );
  }
}

Outro.contextType = SurveyContext;

export default Outro;
