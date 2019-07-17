import React, { Component } from "react";
import PageNavigation from "../common/PageNavigation";
import SurveyContext from "../../context/SurveyContext";

class Task1Outro extends Component {
  componentDidMount() {
    this.context.setPageTitle("Task 1");
  }

  render() {
    return (
      <div>
        <p>
          You will now move onto the second task of this study. Please click
          next to begin Task 2.
        </p>

        <PageNavigation to="/task/2/instructions" />
      </div>
    );
  }
}

Task1Outro.contextType = SurveyContext;

export default Task1Outro;
