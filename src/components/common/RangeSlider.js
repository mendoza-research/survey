import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const _ = require("lodash");
const className = require("classnames");

class RangeSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      step: null,
      markStep: null,
      markPoints: null,
      marks: null,
      labelWrapperClassStr: null
    };

    this.setValue = this.setValue.bind(this);
  }

  componentDidMount() {
    const { min, max } = this.props;

    this.setState({
      value: min + (max - min) / 2
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)
    );
  }

  static getDerivedStateFromProps(props, state) {
    const { min, centerLabel, max, customMarks } = props;

    const markStep = props.hasOwnProperty("markStep") ? props.markStep : 10;
    const step = props.hasOwnProperty("step") ? this.props.step : 1;
    const markPoints = _.range(min, max + 0.001, markStep);
    const labelWrapperClassStr = className({
      "range-labels": true,
      "has-center-label": Boolean(centerLabel)
    });

    // Generate marks
    const marks = customMarks
      ? customMarks
      : _.zipObject(markPoints, markPoints);

    return {
      step,
      markStep,
      markPoints,
      marks,
      labelWrapperClassStr
    };
  }

  setValue(value) {
    const { id, filter, onChange } = this.props;

    value = filter ? filter(value) : value;

    this.setState({ value }, () => {
      onChange(id, value);
    });
  }

  render() {
    const { min, minLabel, centerLabel, max, maxLabel, text } = this.props;
    const { step, marks, value, labelWrapperClassStr } = this.state;

    return (
      <div className="range-slider-wrapper">
        {text && <p className="text">{text}</p>}
        <div className="range-slider">
          <Slider
            min={min}
            max={max}
            step={step}
            marks={marks}
            value={value}
            onChange={this.setValue}
          />
        </div>
        <div className={labelWrapperClassStr}>
          <div className="label-min">{minLabel ? minLabel : " "}</div>
          {centerLabel && <div className="label-center">{centerLabel}</div>}
          <div className="label-max">{maxLabel ? maxLabel : " "}</div>
        </div>
      </div>
    );
  }
}

export default RangeSlider;
