import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class NavButton extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    const { history, beforeNavigate, to } = this.props;

    if (beforeNavigate) {
      await beforeNavigate();
    }

    history.push(to);
  }

  render() {
    return (
      <div className="btn-nav" onClick={this.onClick}>
        Next
      </div>
    );
  }
}

export default withRouter(NavButton);
