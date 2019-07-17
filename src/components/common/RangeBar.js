import React, { Component } from "react";
const _ = require("lodash");
const classNames = require("classnames");

class RangeBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    };
  }

  setValue(value) {
    const { id, onChange } = this.props;

    this.setState({ value }, () => {
      onChange(id, value);
    });
  }

  render() {
    const { min, minLabel, max, maxLabel, step, text, marks } = this.props;

    const generatedMarks = marks ? marks : _.range(min, max + 0.001, step);

    return (
      <div className="range-bar-wrapper">
        <p className="text">{text}</p>
        <div className="range-bar">
          {generatedMarks.map(v => {
            const classStr = classNames({
              "box-checkmark": true,
              "is-checked": this.state.value === v
            });

            return (
              <div
                key={v}
                className={classStr}
                onClick={() => this.setValue(v)}
              >
                {v}
              </div>
            );
          })}
        </div>
        <div className="range-labels">
          <div className="label-min">{minLabel ? `← ${minLabel}` : " "}</div>

          <div className="label-max">{maxLabel ? `${maxLabel} →` : " "}</div>
        </div>
      </div>
    );
  }
}

export default RangeBar;
