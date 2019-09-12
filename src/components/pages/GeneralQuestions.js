import React, { Component } from "react";
import PageNavigation from "./../common/PageNavigation";
import SurveyContext from "../../context/SurveyContext";
import MultipleChoice from "../common/MultipleChoice";
import RangeSlider from "./../common/RangeSlider";
import MatrixTable from "../common/MatrixTable";
import Checkmark from "../common/Checkmark";

class GeneralQuestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null,
      duration: null,
      errorMessage: null,
      data: {
        "what-was-too-fast": null,
        "who-is-so-tall": null,
        "what-is-too-large": null,
        "who-received-help": null,
        "who-was-so-heavy": null,
        "full-time-work-experience": "",
        "current-age": "",
        gender: null,
        "highest-level-of-education": null,
        "average-gpa": null,
        "teachers-guidance": undefined,
        "num-accounting-courses": null,
        "num-finance-courses": null,
        "invested-before": null,
        "plan-to-invest": null
      }
    };

    this.originalStartTime = null;

    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.originalStartTime = new Date();
  }

  onChange(key, value) {
    this.setState({
      data: {
        ...this.state.data,
        [key]: value
      }
    });
  }

  canSubmit() {
    return Object.values(this.state.data).every(v => v === 0 || !!v);
  }

  async submit() {
    const endTime = new Date();
    const duration = (endTime - this.originalStartTime) / 1000;

    return new Promise((resolve, reject) => {
      this.setState(
        {
          startTime: this.originalStartTime.toISOString(),
          endTime: endTime.toISOString(),
          duration
        },
        async () => {
          const stateCopy = Object.assign({}, this.state);

          // No need to save error message into the database
          delete stateCopy.errorMessage;

          await this.context.addUserResponse("general-questions", stateCopy);
          const response = await this.context.submitUserResponse();

          console.log(response);

          this.setState(
            {
              errorMessage: response.data.error
            },
            () => {
              resolve(response.data.success);
            }
          );
        }
      );
    });
  }

  render() {
    const { errorMessage } = this.state;

    return (
      <div>
        <h2>General Information and Demographic Questions</h2>
        <p>
          For the purpose of understanding more about the group of study
          participants as a whole, it would be helpful to know the following
          details about you:
        </p>

        <div className="question-item">
          <p className="question-text">
            <Checkmark
              show={this.state.data["full-time-work-experience"] !== ""}
            />
            1. How many years of full-time work experience do you have?
          </p>

          <input
            type="number"
            value={this.state.data["full-time-work-experience"]}
            onChange={e =>
              this.onChange(
                "full-time-work-experience",
                Number.isNaN(Number.parseInt(e.target.value))
                  ? ""
                  : Number.parseInt(e.target.value)
              )
            }
          />
        </div>

        <div className="question-item">
          <p className="question-text">
            <Checkmark show={this.state.data["current-age"] !== ""} />
            2. Please input your current age (in years).
          </p>

          <input
            type="number"
            value={this.state.data["current-age"]}
            onChange={e =>
              this.onChange(
                "current-age",
                Number.isNaN(Number.parseInt(e.target.value))
                  ? ""
                  : Number.parseInt(e.target.value)
              )
            }
          />
        </div>

        <div className="question-item">
          <p className="question-text">
            <Checkmark show={this.state.data["gender"] !== null} />
            3. What gender do you identify with?
          </p>

          <MultipleChoice
            id="gender"
            value={this.state.data.gender}
            values={["Male", "Female", "Prefer not to answer"]}
            onChange={this.onChange}
          />
        </div>

        <div className="question-item">
          <p className="question-text">
            <Checkmark
              show={this.state.data["highest-level-of-education"] !== null}
            />
            4. What is the highest level of education you have completed?
          </p>

          <MultipleChoice
            id="highest-level-of-education"
            value={this.state.data["highest-level-of-education"]}
            values={[
              "Graduate degree",
              "Undergraduate degree",
              "Some college courses",
              "Trade school",
              "High school"
            ]}
            onChange={this.onChange}
          />
        </div>

        <div className="question-item">
          <p className="question-text">
            <Checkmark show={this.state.data["average-gpa"] !== null} />
            5. What was your average GPA in the past?
          </p>

          <MultipleChoice
            id="average-gpa"
            value={this.state.data["average-gpa"]}
            values={[
              "A and above",
              "Between A and B",
              "Between B and C",
              "Between C and D",
              "D and below"
            ]}
            onChange={this.onChange}
          />
        </div>

        <div className="question-item">
          <p className="question-text">
            <Checkmark
              show={this.state.data["teachers-guidance"] !== undefined}
            />
            6. In the past, how often have you followed your teachers' guidance
            when preparing for a class?
          </p>

          <RangeSlider
            id="teachers-guidance"
            min={0}
            minLabel="Not often at all"
            max={100}
            maxLabel="Very often"
            value={this.state.data["teachers-guidance"]}
            onChange={this.onChange}
          />
        </div>

        <div className="question-item">
          <p className="question-text">
            <Checkmark
              show={
                this.state.data["num-accounting-courses"] !== null &&
                this.state.data["num-finance-courses"] !== null
              }
            />
            7. How many undergraduate and/or graduate accounting and finance
            courses have you taken, including any in which you are currently
            enrolled?
          </p>

          <MatrixTable
            columnHeaders={[
              "0 courses",
              "1 course",
              "2 courses",
              "3 courses",
              "4 courses",
              "5+ courses"
            ]}
            rowHeaders={["Accounting", "Finance"]}
            ids={["num-accounting-courses", "num-finance-courses"]}
            values={[
              this.state.data["num-accounting-courses"],
              this.state.data["num-finance-courses"]
            ]}
            onChange={this.onChange}
          />
        </div>

        <div className="question-item">
          <p className="question-text">
            <Checkmark show={this.state.data["invested-before"] !== null} />
            8. Have you ever invested money in the stock market? (e.g., stock,
            mutual fund, exchange traded fund, etc.)
          </p>

          <MultipleChoice
            id="invested-before"
            value={this.state.data["invested-before"]}
            values={["Yes", "No"]}
            onChange={this.onChange}
          />
        </div>

        <div className="question-item">
          <p className="question-text">
            <Checkmark show={this.state.data["plan-to-invest"] !== null} />
            9. Do you plan to invest money in the stock market in the future
            (e.g., stock, mutual fund, exchange traded fund, etc.)
          </p>

          <MultipleChoice
            id="plan-to-invest"
            value={this.state.data["plan-to-invest"]}
            values={["Yes", "No"]}
            onChange={this.onChange}
          />
        </div>

        <div className="question-item">
          <p className="question-text">
            <Checkmark show={this.state.data["what-was-too-fast"] !== null} />
            10. The delivery truck zoomed by the school bus because it was going
            so fast. What was going so fast?
          </p>

          <MultipleChoice
            id="what-was-too-fast"
            value={this.state.data["what-was-too-fast"]}
            values={["The truck", "The bus"]}
            onChange={this.onChange}
          />
        </div>

        <div className="question-item">
          <p className="question-text">
            <Checkmark show={this.state.data["who-is-so-tall"] !== null} />
            11. John couldn't see the stage with Billy in front of him because
            he is so tall. Who is so tall?
          </p>

          <MultipleChoice
            id="who-is-so-tall"
            value={this.state.data["who-is-so-tall"]}
            values={["John", "Billy"]}
            onChange={this.onChange}
          />
        </div>

        <div className="question-item">
          <p className="question-text">
            <Checkmark show={this.state.data["what-is-too-large"] !== null} />
            12. The trophy doesn't fit into the brown suitcase because it is too
            large. What is too large?
          </p>

          <MultipleChoice
            id="what-is-too-large"
            value={this.state.data["what-is-too-large"]}
            values={["The suitcase", "The trophy"]}
            onChange={this.onChange}
          />
        </div>

        <div className="question-item">
          <p className="question-text">
            <Checkmark show={this.state.data["who-received-help"] !== null} />
            13. Joan made sure to thank Susan for all the help she had received.
            Who had received help?
          </p>

          <MultipleChoice
            id="who-received-help"
            value={this.state.data["who-received-help"]}
            values={["Joan", "Susan"]}
            onChange={this.onChange}
          />
        </div>

        <div className="question-item">
          <p className="question-text">
            <Checkmark show={this.state.data["who-was-so-heavy"] !== null} />
            14. The man couldn't lift his son because he was so heavy. Who was
            so heavy?
          </p>

          <MultipleChoice
            id="who-was-so-heavy"
            value={this.state.data["who-was-so-heavy"]}
            values={["The man", "The son"]}
            onChange={this.onChange}
          />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <PageNavigation
          disabled={!this.canSubmit()}
          disabledMsg="Please answer all questions"
          beforeNavigate={this.submit}
          to="/outro"
        />
      </div>
    );
  }
}

GeneralQuestions.contextType = SurveyContext;

export default GeneralQuestions;
