import React, { Component } from "react";

class StringBlock extends Component {
  render() {
    const { string, top, bottom } = this.props;

    return (
      <div className="string-block">
        <div>StringBlock Component</div>
      </div>
    );
  }
}

export default StringBlock;
