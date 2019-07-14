import React, { Component } from "react";
import NavButton from "../common/NavButton";

class Intro extends Component {
  render() {
    return (
      <div>
        <p>
          Thank you for agreeing to participate in our study, which is comprised
          of two separate tasks.
        </p>

        <p>Please click next to begin Task 1.</p>

        <NavButton to="/task1/instructions" />
      </div>
    );
  }
}

export default Intro;
