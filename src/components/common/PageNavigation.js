import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";
const classNames = require("classnames");

class PageNavigation extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    const { history, disabled, beforeNavigate, to } = this.props;

    if (disabled) return;

    if (beforeNavigate) {
      await beforeNavigate();
    }

    history.push(to);
  }

  render() {
    const { disabled, disabledMsg } = this.props;

    const btnClassStr = classNames({
      "btn-nav": true,
      disabled: disabled
    });

    return (
      <React.Fragment>
        <div className="page-navigation">
          <div
            id="btn-next"
            className={btnClassStr}
            data-tip={disabled ? disabledMsg : null}
            onClick={this.onClick}
          >
            Next
          </div>
        </div>
        <ReactTooltip />
      </React.Fragment>
    );
  }
}

export default withRouter(PageNavigation);
