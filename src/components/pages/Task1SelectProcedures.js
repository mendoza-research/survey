import React, { Component } from "react";
import PageNavigation from "./../common/PageNavigation";
import Checkbox from "../common/Checkbox";
import SurveyContext from "../../context/SurveyContext";

class Task1SelectProcedures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null,
      duration: null,
      data: {
        "read-textbook": false,
        "take-notes": false,
        "participate-every-class": false,
        "study-for-exams": false,
        "do-homework": false,
        "follow-news": false,
        "try-textbook-problems": false,
        "hire-tutor": false,
        "print-slides-to-class": false,
        "review-lecture-slides": false,
        "do-practice-exams": false,
        "visit-office-hours": false,
        "attend-every-class": false
      }
    };

    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.saveResults = this.saveResults.bind(this);
  }

  componentDidMount() {
    this.setState({
      startTime: new Date()
    });
  }

  onCheckboxChange(event) {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.id]: !this.state[event.target.id]
      }
    });
  }

  canSubmit() {
    return Object.values(this.state.data).some(v => v === true);
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
        await this.context.addUserResponse("task1.procedures", this.state);
      }
    );
  }

  render() {
    return (
      <div>
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
          <Checkbox
            id="do-homework"
            text="Do the homework for all chapters"
            onChange={this.onCheckboxChange}
          />
          <Checkbox
            id="follow-news"
            text="Follow news articles online regarding current topics covered in class"
            onChange={this.onCheckboxChange}
          />
          <Checkbox
            id="try-textbook-problems"
            text="Try all the problems at the back of the textbook"
            onChange={this.onCheckboxChange}
          />
          <Checkbox
            id="hire-tutor"
            text="Hire a tutor"
            onChange={this.onCheckboxChange}
          />
          <Checkbox
            id="print-slides-to-class"
            text="Print the instructor’s slides and bring to class"
            onChange={this.onCheckboxChange}
          />
          <Checkbox
            id="review-lecture-slides"
            text="Review lecture slides after class"
            onChange={this.onCheckboxChange}
          />
          <Checkbox
            id="do-practice-exams"
            text="Do the practice exams without referencing the answer key"
            onChange={this.onCheckboxChange}
          />
          <Checkbox
            id="visit-office-hours"
            text="Visit the instructor’s office hours each week to work through questions"
            onChange={this.onCheckboxChange}
          />
          <Checkbox
            id="attend-every-class"
            text="Attend every class"
            onChange={this.onCheckboxChange}
          />
        </div>

        <PageNavigation
          disabled={!this.canSubmit()}
          disabledMsg="Please select at least one procedure"
          beforeNavigate={this.saveResults}
          to="/task/1/questions/1"
        />
      </div>
    );
  }
}

Task1SelectProcedures.contextType = SurveyContext;

export default Task1SelectProcedures;
