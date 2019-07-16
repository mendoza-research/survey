import React, { Component } from "react";
import NavButton from "./../common/NavButton";
import Checkbox from "../common/Checkbox";
import firebase from "../../firebase/firebase";

class Task1SelectProcedures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "read-textbook": false,
      "take-notes": false,
      "participate-every-class": false,
      "study-for-exams": false
    };

    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.saveResults = this.saveResults.bind(this);
  }

  onCheckboxChange(event) {
    this.setState({
      [event.target.id]: !this.state[event.target.id]
    });
  }

  async saveResults() {
    await firebase.db.collection("responses").add(this.state);
  }

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
          <Checkbox
            id="read-textbook"
            text="Read the textbook chapters before they are covered in class"
            onChange={this.onCheckboxChange}
          />
          <Checkbox
            id="take-notes"
            text="Take notes during class"
            onChange={this.onCheckboxChange}
          />
          <Checkbox
            id="participate-every-class"
            text="Participate in every class"
            onChange={this.onCheckboxChange}
          />
          <Checkbox
            id="study-for-exams"
            text="Study for the midterm and final exam"
            onChange={this.onCheckboxChange}
          />
        </div>

        <NavButton
          beforeNavigate={this.saveResults}
          to="/task1/select-procedures"
        />
      </div>
    );
  }
}

export default Task1SelectProcedures;