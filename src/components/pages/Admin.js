import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DominoSpinner } from "react-spinners-kit";
const axios = require("axios");

class AdminBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      columns: [],
      data: []
    };
  }

  componentDidMount() {
    axios
      .get("/get-all-responses")
      .then(res => {
        console.log(res);

        this.setState({
          isLoading: false,
          columns: res.data.columns,
          data: res.data.responses
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { isLoading, columns, data } = this.state;

    return (
      <div id="admin">
        <div className="admin-header">
          <div className="table-title">{data.length} response(s)</div>

          <div className="table-controls">
            <a
              href="https://us-central1-kimendoz-survey.cloudfunctions.net/app/export-all-responses"
              className="btn"
            >
              Export to CSV
            </a>
          </div>
        </div>

        {isLoading && (
          <div className="loading-box">
            <div className="spinner-container">
              <DominoSpinner size={300} color="#aed6f1" loading={isLoading} />
              <span className="loading-text">Loading responses...</span>
            </div>
          </div>
        )}

        {!isLoading && <DataTable columns={columns} data={data} />}
      </div>
    );
  }
}

class DataTable extends Component {
  render() {
    const { columns, data } = this.props;

    return (
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
