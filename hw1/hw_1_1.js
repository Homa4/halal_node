import fs from "fs";
// const fs = require("fs");

const readStream = fs.createReadStream("./source.txt", { encoding: "utf-8" });
const writeStream = fs.createWriteStream("./copy.txt", { encoding: "utf-8" });

readStream.on("data", (chunk) => {
  writeStream.write(chunk);
});
