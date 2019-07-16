import React, { Component } from "react";
import SurveyContext from "../../context/SurveyContext";

class Task1QuestionsPart1 extends Component {
  componentDidMount() {
    this.context.setPageTitle("Task 1 - Questions");
  }

  render() {
    return (
      <div>
        <h2>Please answer the following questions about Task 1. </h2>

        <p>
          In general, if you perform only the procedures you chose, how well do
          you think you will do in the class?
        </p>
      </div>
    );
  }
}

Task1QuestionsPart1.contextType = SurveyContext;

export default Task1QuestionsPart1;
