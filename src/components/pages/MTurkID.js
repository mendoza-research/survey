import React, { Component } from "react";
import PageNavigation from "./../common/PageNavigation";
import SurveyContext from "../../context/SurveyContext";
import ReCAPTCHA from "react-google-recaptcha";
import { DominoSpinner } from "react-spinners-kit";

class MTurkID extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null,
      duration: null,
      isValidatingRecaptcha: false,
      data: {
        id: "",
        isRecaptchaValid: false
      }
    };

    this.recaptchaRef = React.createRef();
    this.originalStartTime = null;

    this.onChange = this.onChange.bind(this);
    this.onRecaptchaResponse = this.onRecaptchaResponse.bind(this);
    this.saveResults = this.saveResults.bind(this);
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

  async onRecaptchaResponse(recaptchaResponse) {
    new Promise((resolve, reject) => {
      this.setState(
        {
          isValidatingRecaptcha: true
        },
        async () => {
          const recaptchaResult = await this.context.validateRecaptcha(
            recaptchaResponse
          );

          resolve(recaptchaResult);
        }
      );
    }).then(recaptchaResult => {
      this.setState({
        isValidatingRecaptcha: false
      });

      this.onChange("isRecaptchaValid", recaptchaResult);
    });
  }

  canSubmit() {
    return Object.values(this.state.data).every(v => !!v);
  }

  async saveResults() {
    const endTime = new Date();
    const duration = (endTime - this.originalStartTime) / 1000;

    await new Promise((resolve, reject) => {
      this.setState(
        {
          startTime: this.originalStartTime.toISOString(),
          endTime: endTime.toISOString(),
          duration
        },
        async () => {
          const stateCopy = Object.assign({}, this.state);

          // Remove property that shouldn't be saved into the database
          delete stateCopy.isValidatingRecaptcha;

          await this.context.addUserResponse("mturk-id", stateCopy);
          resolve();
        }
      );
    });
  }

  render() {
    const { isValidatingRecaptcha } = this.state;

    return (
      <div>
        <p>Please enter your MTurk ID.</p>

        <input
          type="text"
          value={this.state.data["id"]}
          onChange={e => this.onChange("id", e.target.value)}
        />

        <div className="recaptcha-box">
          <ReCAPTCHA
            ref={this.recaptchaRef}
            sitekey="6Lecf7MUAAAAANgk7T8e9jI9W_qZ1WkZSu0tFgJ6"
            onChange={this.onRecaptchaResponse}
            onExpired={() => {
              this.onChange("isRecaptchaValid", false);
            }}
            onErrored={() => {
              this.onChange("isRecaptchaValid", false);
            }}
          />
        </div>

        {isValidatingRecaptcha && (
          <div className="loading-box">
            <div className="spinner-container">
              <DominoSpinner
                size={100}
                color="#aed6f1"
                loading={isValidatingRecaptcha}
              />
              <span className="loading-text">Validating reCAPTCHA...</span>
            </div>
          </div>
        )}

        <PageNavigation
          disabled={!this.canSubmit()}
          disabledMsg="Please answer all questions"
          beforeNavigate={this.saveResults}
          to="/intro"
        />
      </div>
    );
  }
}

MTurkID.contextType = SurveyContext;

export default MTurkID;
