const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
const { Parser } = require("json2csv");
const fields = require("./fields.json");
const objectPath = require("object-path");

var serviceAccount = require("./firebase-admin-sdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kimendoz-survey.firebaseio.com"
});

async function getAllResponsesAsJSON() {
  let responsesRef = admin.firestore().collection("responses");
  let snapshot = await responsesRef.get();

  const allDocs = [];

  snapshot.forEach(doc => {
    allDocs.push(Object.assign({}, { sessionId: doc.id }, doc.data()));
  });

  // Pre-process firestore documents
  // Convert arrays to objects with number keys for json2csv
  let processedDocs = allDocs.map(doc => {
    if (doc.pages.hasOwnProperty("task2-quiz")) {
      doc.pages["task2-quiz"].data = {
        ...doc.pages["task2-quiz"].data
      };
    }

    if (doc.pages.hasOwnProperty("task2-word-recall-questions")) {
      doc.pages["task2-word-recall-questions"].data = {
        ...doc.pages["task2-word-recall-questions"].data
      };
    }

    return doc;
  });

  return processedDocs;
}

async function getAllResponsesAsCSV() {
  const processedDocs = await getAllResponsesAsJSON();

  const parser = new Parser(parseOptions);
  const csv = parser.parse(processedDocs);

  return csv;
}

exports.getAllResponses = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    const processedDocs = await getAllResponsesAsJSON();
    const flattenedDocs = [];

    processedDocs.forEach(doc => {
      let flattenedDoc = {};

      fields.forEach(field => {
        flattenedDoc[field.label] = objectPath.get(doc, field.value);
      });

      flattenedDocs.push(flattenedDoc);
    });

    res.json({ data: flattenedDocs });
  });
});

exports.exportAllResponses = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    const csv = await getAllResponsesAsCSV();

    res.setHeader("Content-disposition", "attachment; filename=export.csv");
    res.set("Content-Type", "text/csv");

    return res.status(200).send(csv);
  });
});
