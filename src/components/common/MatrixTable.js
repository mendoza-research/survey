import React, { Component } from "react";

class MatrixTable extends Component {
  render() {
    const { rowHeaders, columnHeaders, ids, values, onChange } = this.props;
    return (
      <div className="matrix-table-wrapper">
        <table className="matrix-table">
          <thead>
            <tr>
              <th>&nbsp;</th>
              {columnHeaders.map(header => (
                <th key={header} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rowHeaders.map((header, rowIdx) => (
              <tr key={header}>
                <th scope="row">{header}</th>

                {columnHeaders.map(column => (
                  <td
                    className={values[rowIdx] === column ? "selected" : ""}
                    onClick={() => onChange(ids[rowIdx], column)}
                    key={column}
                  >
                    <span className="checkmark">&#x2713;</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MatrixTable;
