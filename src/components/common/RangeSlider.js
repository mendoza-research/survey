import React, { Component } from "react";
import Slider, { createSliderWithTooltip } from "rc-slider";
import Checkmark from "./Checkmark";
import "rc-slider/assets/index.css";
const _ = require("lodash");
const className = require("classnames");

const SliderWithTooltip = createSliderWithTooltip(Slider);

class RangeSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: null,
      markStep: null,
      markPoints: null,
      marks: null,
      labelWrapperClassStr: null
    };

    this.setValue = this.setValue.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)
    );
  }

  static getDerivedStateFromProps(props, state) {
    const { min, centerLabel, max, customMarks } = props;

    const markStep = props.hasOwnProperty("markStep") ? props.markStep : 10;
    const step = props.hasOwnProperty("step") ? props.step : 1;
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

    onChange(id, value);
  }

  render() {
    const {
      value,
      min,
      minLabel,
      centerLabel,
      max,
      maxLabel,
      text
    } = this.props;
    const { step, marks, labelWrapperClassStr } = this.state;

    return (
      <div className="range-slider-wrapper">
        {text && (
          <p className="text">
            <Checkmark show={value !== undefined && value !== null} />
            {text}
          </p>
        )}
        <div className="range-slider">
          <SliderWithTooltip
            min={min}
            max={max}
            tipFormatter={v => {
              console.log(v);
              return v;
            }}
            step={step}
            marks={marks}
            value={value}
            onChange={this.setValue}
          />
        </div>
        <div className={labelWrapperClassStr}>
          <div className="label-min">
            <div className="label-text">{minLabel ? minLabel : " "}</div>
          </div>
          {centerLabel && (
            <div className="label-center">
              <div className="label-text">{centerLabel}</div>
            </div>
          )}
          <div className="label-max">
            <div className="label-text">{maxLabel ? maxLabel : " "}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default RangeSlider;
