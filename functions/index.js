const functions = require("firebase-functions");
// const cors = require("cors")({ origin: true });
const cors = require("cors");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
const { Parser } = require("json2csv");
const fields = require("./fields.json");
const objectPath = require("object-path");

app.use(cors({ origin: true }));

var serviceAccount = require("./firebase-admin-sdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kimendoz-survey.firebaseio.com"
});

// Return all responses as a non-flattened JSON
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

// Return all responses as a CSV string
async function getAllResponsesAsCSV() {
  const processedDocs = await getAllResponsesAsJSON();

  const parseOptions = {
    fields
  };

  const parser = new Parser(parseOptions);
  const csv = parser.parse(processedDocs);

  return csv;
}

// Validate Captcha
// If successful, save a participant's response
// If unsuccessful, notify the participant

// Return all responses as a flattened JSON
app.get("/get-all-responses", async (req, res) => {
  const processedDocs = await getAllResponsesAsJSON();
  const flattenedDocs = [];

  processedDocs.forEach(doc => {
    let flattenedDoc = {};

    fields.forEach(field => {
      if (objectPath.has(doc, field.value)) {
        flattenedDoc[field.label] = objectPath.get(doc, field.value);
      }
    });

    flattenedDocs.push(flattenedDoc);
  });

  res.json({ data: flattenedDocs });
});

// Return all responses as a CSV file
// exports.exportAllResponses = functions.https.onRequest((req, res) => {
//   return cors(req, res, async () => {

app.get("/export-all-responses", async (req, res) => {
  const csv = await getAllResponsesAsCSV();

  res.setHeader("Content-disposition", "attachment; filename=export.csv");
  res.set("Content-Type", "text/csv");

  return res.status(200).send(csv);
});
//   });
// });

exports.functions = functions.https.onRequest(app);
