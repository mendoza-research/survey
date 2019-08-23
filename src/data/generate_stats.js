const task2_strings = require("./task2_strings.json");
const task2_word_recall_questions = require("./task2_word_recall_questions.json");

let flashingWordCount = 0;
let flashingWords = [];
let answerCount = {
  4: 0,
  5: 0,
  6: 0,
  7: 0
};

console.log("============================");
console.log("============================");
console.log("============================");
console.log(`string blocks count=${task2_strings.length}`);
console.log(`recall words count=${task2_word_recall_questions.length}`);
console.log("============================");
task2_strings.forEach((block, idx) => {
  let count = 0;

  if (block.hasOwnProperty("word")) {
    flashingWords.push(block["word"]);
    flashingWordCount++;
  }

  [...block.string].forEach((char, idx) => {
    if (char === "d") {
      if (block.top[idx] + block.bottom[idx] === 2) {
        count++;
      }
    }
  });

  console.log(
    `${(idx + 1).toString().padStart(2, "0")}: ${block.string},${count}${
      block.hasOwnProperty("word")
        ? "," +
          block["word"] +
          (task2_word_recall_questions.includes(block["word"])
            ? " - recall question"
            : "")
        : ""
    }`
  );
  answerCount[count] += 1;
});

console.log("============================");
console.log(`Number of flashing words=${flashingWordCount}`);
console.log("============================");
console.log("answerCount");
console.log(answerCount);
console.log("============================");
let recallFlashedCount = 0;
task2_word_recall_questions.forEach(word => {
  const isFlashed = flashingWords.includes(word);

  recallFlashedCount += isFlashed ? 1 : 0;

  console.log(`${isFlashed ? "flashed" : "       "} ${word}`);
});
console.log("============================");
console.log(`Flashed recall words count=${recallFlashedCount}`);
console.log("============================");
console.log("");
console.log("");
console.log("");
console.log("");
console.log("");
console.log("");
console.log("");
console.log("");
console.log("");
