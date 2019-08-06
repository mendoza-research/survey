import React, { Component } from "react";
import firebase from "../../firebase";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      csv: ""
    };
  }

  componentDidMount() {
    const getAllResponses = firebase.functions.httpsCallable("getAllResponses");
    getAllResponses().then(result => {
      console.log(result);
      this.setState({
        csv: result.data
      });
    });
  }

  render() {
    return (
      <div id="admin">
        <h2>Admin</h2>

        <a
          href="https://us-central1-kimendoz-survey.cloudfunctions.net/exportAllResponses
"
          className="btn"
        >
          Export to CSV
        </a>
      </div>
    );
  }
}

export default Admin;
