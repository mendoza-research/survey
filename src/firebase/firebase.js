import app from "firebase/app";
import "firebase/firestore";

import firebaseConfig from "./config";

const firebase = require("firebase");

// Requried for side-effects
require("firebase/functions");

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.db = app.firestore();
    var functions = firebase.functions();

    const addMessage = functions.httpsCallable("addMessage");
    addMessage().then(function(result) {
      console.log(result);
    });
  }
}

export default new Firebase();
