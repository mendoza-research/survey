import React, { Component } from "react";
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
      </div>
    );
  }
}

export default Admin;
