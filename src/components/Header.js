import React, { Component } from "react";
import SurveyContext from "../context/SurveyContext";

class Header extends Component {
  render() {
    return (
      <SurveyContext.Consumer>
        {values => {
          return (
            <div id="header">
              <div>{values.pageTitle}</div>
            </div>
          );
        }}
      </SurveyContext.Consumer>
    );
  }
}

export default Header;
