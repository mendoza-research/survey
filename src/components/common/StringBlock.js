import React, { Component } from "react";
const _ = require("lodash");

class StringBlock extends Component {
  render() {
    const { string, top, bottom } = this.props;

    const charBoxes = [];

    for (let i = 0; i < string.length; i++) {
      charBoxes.push(
        <div className="character-box">
          <div className="top">
            {top[i] > 0 ? (
              _.times(top[i], () => "'")
            ) : (
              <span className="hidden">-</span>
            )}
          </div>
          <div className="char">{string[i]}</div>
          <div className="bottom">
            {bottom[i] > 0 ? (
              _.times(bottom[i], () => "'")
            ) : (
              <span className="hidden">-</span>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="string-block-wrapper">
        <div className="string-block">{charBoxes}</div>
      </div>
    );
  }
}

export default StringBlock;
