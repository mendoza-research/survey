import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const _ = require("lodash");

class RangeSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    };

    this.setValue = this.setValue.bind(this);
  }

  setValue(value) {
    const { id, onChange } = this.props;

    this.setState({ value }, () => {
      onChange(id, value);
    });
  }

  render() {
    const { min, minLabel, max, maxLabel, text, customMarks } = this.props;

    const markPoints = _.range(min, max + 0.001, 10);

    // Generate marks
    const marks = customMarks
      ? customMarks
      : _.zipObject(markPoints, markPoints);

    return (
      <div className="range-bar-wrapper">
        <p className="text">{text}</p>
        <div className="range-bar">
          <Slider
            min={min}
            max={max}
            step={1}
            marks={marks}
            onChange={this.setValue}
            defaultValue={0}
          />
        </div>
        <div className="range-labels">
          <div className="label-min">{minLabel ? `← ${minLabel}` : " "}</div>

          <div className="label-max">{maxLabel ? `${maxLabel} →` : " "}</div>
        </div>
      </div>
    );
  }
}

export default RangeSlider;
