import React from "react";

const Checkmark = ({ show }) => {
  return (
    show && (
      <span className="checkmark" role="img" aria-label="checkmark">
        ✔️
      </span>
    )
  );
};

export default Checkmark;
