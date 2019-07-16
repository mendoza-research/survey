import React, { Component } from "react";
import NavButton from "../common/NavButton";
import SurveyContext from "../../context/SurveyContext";

class Intro extends Component {
  render() {
    return (
      <SurveyContext.Consumer>
        {values => {
          return (
            <div>
              <p>
                Thank you for agreeing to participate in our study, which is
                comprised of two separate tasks.
              </p>

              <p>Please click next to begin Task 1.</p>

              <NavButton to="/task1/instructions" />
            </div>
          );
        }}
      </SurveyContext.Consumer>
    );
  }
}

export default Intro;
