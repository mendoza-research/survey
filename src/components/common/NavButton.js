import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavButton extends Component {
  render() {
    const { to } = this.props;
    return (
      <NavLink className="btn-nav" to={to}>
        Next
      </NavLink>
    );
  }
}

export default NavButton;
