const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
const { Parser } = require("json2csv");

var serviceAccount = require("./kimendoz-survey-firebase-adminsdk-3ke6d-9829c21100.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kimendoz-survey.firebaseio.com"
});

exports.exportAllResponses = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    let responsesRef = admin.firestore().collection("responses");
    let allResponses = responsesRef
      .get()
      .then(snapshot => {
        const allDocs = [];

        const parseOptions = {
          flatten: true
        };

        snapshot.forEach(doc => {
          allDocs.push(Object.assign({}, { sessionId: doc.id }, doc.data()));
        });

        const parser = new Parser(parseOptions);
        const csv = parser.parse(allDocs);
        response.setHeader(
          "Content-disposition",
          "attachment; filename=report.csv"
        );
        response.set("Content-Type", "text/csv");
        return response.status(200).send(csv);
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  });
});
