const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");

var serviceAccount = require("./kimendoz-survey-firebase-adminsdk-3ke6d-9829c21100.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kimendoz-survey.firebaseio.com"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addMessage = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    let responsesRef = admin.firestore().collection("responses");
    let allResponses = responsesRef
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
        });

        response.send("Hello from Firebase!");
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  });
});
