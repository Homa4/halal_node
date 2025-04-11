const fs = require("fs");

const input = "./text.txt";
const output = "./changedFile.txt";

const data = fs.readFile(input, { encoding: "utf8" }, (error, data) => {
  if (error) {
    fs.writeFile(output, `Ooooops, something went wrong ${error}`);
  }
  const modified = data.replace(/password/gi, "********");
  const writeStream = fs.createWriteStream(output, { encoding: "utf8" });
  writeStream.write(modified);
  writeStream.end();

  writeStream.on("finish", () => {
    console.log("modification has been insert correctly");
  });
});

console.log(data);
