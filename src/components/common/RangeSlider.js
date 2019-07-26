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
    const {
      min,
      minLabel,
      centerLabel,
      max,
      maxLabel,
      text,
      customMarks
    } = this.props;

    const markStep = this.props.hasOwnProperty("markStep")
      ? this.props.markStep
      : 10;
    const step = this.props.hasOwnProperty("step") ? this.props.step : 1;
    const defaultValue = min + (max - min) / 2;

    const markPoints = _.range(min, max + 0.001, markStep);

    // Generate marks
    const marks = customMarks
      ? customMarks
      : _.zipObject(markPoints, markPoints);

    return (
      <div className="range-slider-wrapper">
        <p className="text">{text}</p>
        <div className="range-slider">
          <Slider
            min={min}
            max={max}
            step={step}
            marks={marks}
            onChange={this.setValue}
            defaultValue={defaultValue}
          />
        </div>
        <div className="range-labels">
          <div className="label-min">{minLabel ? `← ${minLabel}` : " "}</div>
          {centerLabel && <div className="label-center">{centerLabel}</div>}
          <div className="label-max">{maxLabel ? `${maxLabel} →` : " "}</div>
        </div>
      </div>
    );
  }
}

export default RangeSlider;
