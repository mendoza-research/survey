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

        <p>
          On the class’s syllabus, the class professor mentions several
          procedures that a student could (should) perform in order to earn a
          grade of a B or higher. The syllabus states:
        </p>

        <p>
          To reach the goal of obtaining a B in my course, students could
          (should) perform the following procedures, for example:
        </p>

        <ol>
          <li>
            The student could (should) read the textbook chapters before they
            are covered in class,
          </li>
          <li>The student could (should) take notes during class,</li>
          <li>The student could (should) participate in every class, </li>
          <li>
            The student could (should) study for the midterm and final exam,
          </li>
          <li>
            The student could (should) do the homework for all chapters, and
          </li>
          <li>
            The student could (should) follow news articles online regarding
            current topics covered in class.
          </li>
        </ol>

        <PageNavigation to="/task/1/select-procedures" />
      </div>
    );
  }
}

Task1Instructions.contextType = SurveyContext;

export default Task1Instructions;
