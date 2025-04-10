const fs = require("fs");
const path = require("path");

const pathToFoder = "./text";
const files = fs.readdirSync(pathToFoder);

let largestSize = 0;

files.forEach((file) => {
  const filePath = path.join(pathToFoder, file);

  const stat = fs.statSync(filePath);
  if (stat.isFile()) {
    if (stat.size > largestSize) {
      largestSize = stat.size;
    }
  }
});

if (largestSize) {
  console.log("The greatest number:", largestSize);
}
