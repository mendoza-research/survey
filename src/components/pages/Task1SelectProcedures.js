import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Task1SelectProcedures extends Component {
  render() {
    return (
      <div>
        <p>
          You will now select the procedures, from the options listed below,
          that you would perform while enrolled in the class.
        </p>

        <p>
          Remember that your time is valuable. Please aim to maximize the
          likelihood of achieving your goal while also being efficient with your
          valuable time. Please mark your selections with a checkmark:
        </p>

        <div className="checklist">
          <div className="option-box">
            <input type="checkbox" id="option-read-textbook" />
            <label for="option-read-textbook">
              Read the textbook chapters before they are covered in class.
            </label>
          </div>

          <div className="option-box">
            <input type="checkbox" id="option-take-notes" />
            <label for="option-take-notes">Take notes during class</label>
          </div>
        </div>

        <NavLink className="btn-nav" to="/task1/select-procedures">
          Next
        </NavLink>
      </div>
    );
  }
}

export default Task1SelectProcedures;
