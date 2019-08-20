import React, { Component } from "react";
import SurveyContext from "../../context/SurveyContext";

class Outro extends Component {
  render() {
    return (
      <div>
        <p>
          You have completed the study.
          <br />
          Thank you for your participation.
        </p>

        <p>
          Please use the code{" "}
          <span className="confirmation-code">R124AWDZKM</span> to show you have
          completed the survey.
        </p>
      </div>
    );
  }
}

Outro.contextType = SurveyContext;

export default Outro;
