const fs = require("fs");
const path = require("path");

const pathToFoder = "./text";
const files = fs.readdirSync(pathToFoder);
let largestSize = 0;

files.forEach((file) => {
  fs.stat(path.join("./text/" + file))
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
  console.log(data);
});

if (largestSize) {
  console.log("The greatest number:", largestSize);
}
