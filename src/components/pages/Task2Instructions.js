import React, { Component } from "react";
import PageNavigation from "../common/PageNavigation";
import SurveyContext from "../../context/SurveyContext";
import StringBlock from "./../common/StringBlock";

const exampleStrs = [
  {
    string: "dpdddddppddp",
    top: [1, 0, 2, 0, 2, 0, 1, 1, 1, 2, 1, 0],
    bottom: [1, 1, 1, 2, 0, 1, 2, 0, 1, 2, 1, 2]
  },
  {
    string: "ddd",
    top: [1, 0, 2],
    bottom: [1, 2, 0]
  }
];

class Task2Instructions extends Component {
  componentDidMount() {
    this.context.setPageTitle("Task 2 - Instructions");
  }

  render() {
    return (
      <div>
        <h2>Instructions for Task 2:</h2>

        <p>
          In this task, you will be presented with strings of p's and d's with
          apostrophes written above and below each letter. For example:
        </p>

        <StringBlock
          string={exampleStrs[0].string}
          top={exampleStrs[0].top}
          bottom={exampleStrs[0].bottom}
        />

        <p>
          Your task will be to count all the{" "}
          <strong>d's with a total of 2 apostrophes</strong>. In other words,
          your task will be to count the following:
        </p>

        <p>
          Work as quickly and as accurately as you can. Type in your response
          using the keys labeled 4 through 7 on the keyboard.
        </p>

        <p>If you are ready to begin, click next.</p>

        <PageNavigation to="/task/1/select-procedures" />
      </div>
    );
  }
}

Task2Instructions.contextType = SurveyContext;

export default Task2Instructions;
