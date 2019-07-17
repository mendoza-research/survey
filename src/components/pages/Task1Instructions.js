import React, { Component } from "react";
import PageNavigation from "../common/PageNavigation";
import SurveyContext from "../../context/SurveyContext";

class Task1Instructions extends Component {
  componentDidMount() {
    this.context.setPageTitle("Task 1 - Instructions");
  }

  render() {
    return (
      <div>
        <h2>Instructions for Task 1:</h2>

        <p>
          Please assume that you are currently taking a college-level business
          class. Your goal is to earn a minimum grade of a B (80 percent) in the
          class.
        </p>

        <p>
          Earning a grade of B or higher takes a lot of hard work, and there are
          many procedures that are typically performed in order to achieve this
          goal. Your taks is to read an excerpt from the professor's syllabus
          and then to select which procedures to perform from among all the
          possible options.
        </p>

        <PageNavigation to="/task/1/select-procedures" />
      </div>
    );
  }
}

Task1Instructions.contextType = SurveyContext;

export default Task1Instructions;
