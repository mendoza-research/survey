import React, { Component } from "react";

class Checkbox extends Component {
  render() {
    const { id, text, onChange } = this.props;

    return (
      <div className="option-box">
        <input type="checkbox" id={id} onChange={onChange} />
        <label htmlFor={id}>{text}</label>
      </div>
    );
  }
}

export default Checkbox;
