const fs = require("fs");

const pathToFile = "./log.txt";
const readingStream = fs.createReadStream(pathToFile, {
  encoding: "utf8",
  highWaterMark: 32,
});

readingStream.on("data", (chunk) => {
  console.log("------------------------------------------------------------");
  console.log(chunk);
  console.log("------------------------------------------------------------");
});

readingStream.on("close", (chunk) => {
  console.log("Stream closed");
});
