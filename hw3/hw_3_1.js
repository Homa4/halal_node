const fs = require("fs");

const writeStream = fs.createWriteStream("./changedFile.txt", "utf8");
const path = "./text.txt";

try {
  fs.readFile(path, "utf8", (error, data) => {
    if (error) throw error;
    let word = "";
    for (let i = 0; i < data.length; i++) {
      if (data[i] !== " ") {
        word += data[i];
      } else {
        if (word.toLowerCase() === "node") {
          word += ".js ";
          writeStream.write(word);
        } else {
          word += " ";
          writeStream.write(word);
        }
        word = "";
      }
    }
  });
} catch (error) {
  console.log(error);
  fs.writeFileSync("./changedFile.txt", error);
}
