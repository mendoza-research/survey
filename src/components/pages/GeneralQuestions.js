import React, { Component } from "react";
import PageNavigation from "./../common/PageNavigation";
import SurveyContext from "../../context/SurveyContext";
import MultipleChoice from "../common/MultipleChoice";
import RangeSlider from "./../common/RangeSlider";
import MatrixTable from "../common/MatrixTable";
import ReCAPTCHA from "react-google-recaptcha";

class GeneralQuestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null,
      duration: null,
      data: {
        "full-time-work-experience": "",
        "current-age": "",
        gender: null,
        "highest-level-of-education": null,
        "average-gpa": null,
        "teachers-guidance": 50,
        "num-accounting-courses": null,
        "num-finance-courses": null,
        "invested-before": null,
        "plan-to-invest": null,
        "recaptcha-response": null
      }
    };

    this.recaptchaRef = React.createRef();

    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.setState({
      startTime: new Date()
    });
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
    return Object.values(this.state.data).every(v => v !== null);
  }

  async submit() {
    const endTime = new Date();
    const duration = (endTime - this.state.startTime) / 1000;

    return new Promise((resolve, reject) => {
      this.setState(
        {
          startTime: this.state.startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration
        },
        async () => {
          await this.context.addUserResponse("general-questions", this.state);
          const response = await this.context.submitUserResponse();

          console.log(response);
          const didRecaptchaSucceed = response.data.success;

          if (!didRecaptchaSucceed) {
            this.recaptchaRef.current.reset();
          }

          resolve(response.data.success);
        }
      );
    });
  }

  render() {
    return (
      <div>
        <h2>General Information and Demographic Questions</h2>
        <p>
          For the purpose of understanding more about the group of study
          participants as a whole, it would be helpful to know the following
          details about you:
        </p>

        <div className="question-item">
          <p>1. How many years of full-time work experience do you have?</p>

          <input
            type="number"
            value={this.state.data["full-time-work-experience"]}
            onChange={e =>
              this.onChange(
                "full-time-work-experience",
                Number.parseInt(e.target.value)
              )
            }
          />
        </div>

        <div className="question-item">
          <p>2. Please input your current age (in years).</p>

          <input
            type="number"
            value={this.state.data["current-age"]}
            onChange={e =>
              this.onChange("current-age", Number.parseInt(e.target.value))
            }
          />
        </div>

        <div className="question-item">
          <p>3. What gender do you identify with?</p>

          <MultipleChoice
            id="gender"
            value={this.state.data.gender}
            values={["Male", "Female", "Prefer not to answer"]}
            onChange={this.onChange}
          />
        </div>

        <div className="question-item">
          <p>4. What is the highest level of education you have completed?</p>

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
          <p>5. What was your average GPA in the past?</p>

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
          <p>
            6. In the past, how often have you followed your teachers' guidance
            when preparing for a class?
          </p>

          <RangeSlider
            id="teachers-guidance"
            min={0}
            minLabel="Not often at all"
            max={100}
            maxLabel="Very often"
            onChange={this.onChange}
          />
        </div>

        <div className="question-item">
          <p>
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
          <p>
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
          <p>
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
          <ReCAPTCHA
            ref={this.recaptchaRef}
            sitekey="6Lecf7MUAAAAANgk7T8e9jI9W_qZ1WkZSu0tFgJ6"
            onChange={value => {
              this.onChange("recaptcha-response", value);
            }}
            onExpired={() => {
              this.onChange("recaptcha-response", null);
            }}
            onErrored={() => {
              this.onChange("recaptcha-response", null);
            }}
          />
        </div>

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
