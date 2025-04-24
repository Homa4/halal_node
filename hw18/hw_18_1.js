const fs = require("fs");
const path = require("path");
const { Colors, Decorations } = require("javascript-console-styling");

const pathToFile = path.join("./text.txt");

function byteToBinaryString(s) {
  return s.toString(2).padStart(8, "0");
}

function binaryToText(str) {
  let output = [];
  str.split(" ").forEach((element) => {
    output.push(String.fromCharCode(parseInt(element, 2)));
  });
  return output.join("");
}

const content = fs.readFileSync(pathToFile);
const valueInBuffer = Buffer.from(content, "binary");

const covertedBinValue = [...valueInBuffer].map(byteToBinaryString).join(" ");
const covertedBinValue2 = binaryToText(covertedBinValue);

console.log(covertedBinValue + "\n`");
console.log(Colors.yellow("\n Restored text\n"));
console.log(covertedBinValue2);
