import React, { Component } from "react";
import ReactDOM from "react-dom";
const axios = require("axios");

class AdminBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      data: [],
      count: 0
    };
  }

  componentDidMount() {
    axios
      .get("/get-all-responses")
      .then(res => {
        console.log(res);

        this.setState({
          columns: res.data.columns,
          data: res.data.responses,
          count: res.data.responses.length
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { columns, data, count } = this.state;

    return (
      <div id="admin">
        <div className="admin-header">
          <div className="table-title">{count} response(s)</div>

          <div className="table-controls">
            <a
              href="https://us-central1-kimendoz-survey.cloudfunctions.net/app/export-all-responses"
              className="btn"
            >
              Export to CSV
            </a>
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {columns.map(column => (
                  <th scope="col" key={"col-" + column}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, rowIdx) => {
                return (
                  <tr
                    className={rowIdx % 2 === 0 ? "even" : "odd"}
                    key={"row-" + rowIdx}
                  >
                    {columns.map((column, columnIdx) => (
                      <td key={rowIdx + "-" + columnIdx}>{row[column]}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

class Admin extends Component {
  render() {
    return (
      <FullWidthContainer>
        <AdminBody />
      </FullWidthContainer>
    );
  }
}

const FullWidthContainer = ({ children }) => {
  return ReactDOM.createPortal(children, document.getElementById("root"));
};

export default Admin;
