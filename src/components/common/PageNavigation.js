import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class PageNavigation extends Component {
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
      <div className="page-navigation">
        <div id="btn-next" className="btn-nav" onClick={this.onClick}>
          Next
        </div>
      </div>
    );
  }
}

export default withRouter(PageNavigation);
