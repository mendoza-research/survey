import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";
const classNames = require("classnames");

class PageNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false
    };

    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    const { history, disabled, beforeNavigate, to } = this.props;
    const { isClicked } = this.state;

    if (disabled || isClicked) return;

    this.setState(
      {
        isClicked: true
      },
      async () => {
        if (beforeNavigate) {
          const canNavigate = await beforeNavigate();

          if (canNavigate === false) {
            this.setState({
              isClicked: false
            });

            return;
          }
        }

        history.push(to);
      }
    );
  }

  render() {
    const { disabled, disabledMsg } = this.props;
    const { isClicked } = this.state;

    const btnClassStr = classNames({
      "btn-nav": true,
      disabled: disabled || isClicked
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
