const fs = require("fs");
const path = require("path");

const pathToFoder = "./text";
const listOfFilesInDir = fs.readdirSync(pathToFoder);

let maxValue = 0;

listOfFilesInDir.forEach((file) => {
  fs.stat("./text/" + file, (err, stats) => {
    if (err) {
      console.log(`File doesn't exist.`);
    } else {
      console.log(file, stats.size);
      if (stats.size > maxValue) {
        maxValue = stats.size;
      }
    }
  });
});

setTimeout(() => {
  console.log("The greatest number:", maxValue);
});
