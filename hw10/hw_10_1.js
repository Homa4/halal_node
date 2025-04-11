const fs = require("fs");
const { Transform } = require("stream");

class PasswordTransform extends Transform {
  constructor(options) {
    super(options);
    this._buffer = "";
  }

  _transform(chunk, encoding, callback) {
    this._buffer += chunk.toString();
    const pattern = "password";
    const safeLength = this._buffer.length - (pattern.length - 1);
    if (safeLength > 0) {
      const processable = this._buffer.slice(0, safeLength);
      const replaced = processable.replace(/password/gi, "********");
      this.push(replaced);
      this._buffer = this._buffer.slice(safeLength);
    }
    callback();
  }

  _flush(callback) {
    const replaced = this._buffer.replace(/password/gi, "********");
    this.push(replaced);
    callback();
  }
}

const readStream = fs.createReadStream("./text.txt", { encoding: "utf8" });
const writeStream = fs.createWriteStream("./changedFile.txt", {
  encoding: "utf8",
});
const passTransform = new PasswordTransform();

readStream
  .pipe(passTransform)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("Файл був успішно змінений.");
  });
