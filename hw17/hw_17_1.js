const fs = require("fs");
const path = require("path");

const pathToFile = path.join("./text.txt");
const pathToBinaryFile = path.join("./binary.txt");

function byteToBinaryString(s) {
  return s.toString(2).padStart(8, "0");
}

const content = fs.readFileSync(pathToFile);

const valueInBuffer = Buffer.from(content, "binary");
const covertedValue = [...valueInBuffer].map(byteToBinaryString).join(" ");
fs.writeFileSync(pathToBinaryFile, covertedValue);
// console.log(valueInBuffer);
