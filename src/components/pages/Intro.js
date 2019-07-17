import React, { Component } from "react";
import PageNavigation from "../common/PageNavigation";
import SurveyContext from "../../context/SurveyContext";

class Intro extends Component {
  componentDidMount() {
    this.context.setPageTitle("Introduction");
  }

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

              <PageNavigation to="/task/1/instructions" />
            </div>
          );
        }}
      </SurveyContext.Consumer>
    );
  }
}

Intro.contextType = SurveyContext;

export default Intro;
