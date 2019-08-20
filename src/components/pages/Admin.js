import React, { Component } from "react";
import { useTable } from "react-table";
const axios = require("axios");

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    axios
      .get("/get-all-responses")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div id="admin">
        <h2>Admin</h2>

        <a
          href="https://us-central1-kimendoz-survey.cloudfunctions.net/app/export-all-responses"
          className="btn"
        >
          Export to CSV
        </a>

        <div className="table-wrapper" />
      </div>
    );
  }
}

function Table({ columns, data }) {
  console.log(columns);
  console.log(data);

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map(
          (row, i) =>
            prepareRow(row) || (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            )
        )}
      </tbody>
    </table>
  );
}

export default Admin;
