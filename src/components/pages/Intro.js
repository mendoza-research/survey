import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Intro extends Component {
  render() {
    return (
      <div>
        <p>
          Thank you for agreeing to participate in our study, which is comprised
          of two separate tasks.
        </p>

        <p>Please click next to begin Task 1.</p>

        <NavLink className="btn-nav" to="/task1/instructions">
          Next
        </NavLink>
      </div>
    );
  }
}

export default Intro;
