import React, { Component } from "react";
const className = require("classnames");

class MultipleChoice extends Component {
  static numberToRoman(n) {
    return String.fromCharCode(97 + n);
  }

  render() {
    const { id, value, values, onChange } = this.props;
    return (
      <div className="radio-group">
        {values.map((v, idx) => {
          return (
            <div
              className={className({
                "radio-option": true,
                selected: v === value
              })}
              key={v}
              onClick={() => onChange(id, v)}
            >
              {MultipleChoice.numberToRoman(idx)}. {v}
            </div>
          );
        })}
      </div>
    );
  }
}

export default MultipleChoice;
