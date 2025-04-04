import fs from "fs";

fs.readFile("./source.txt", "utf-8", (readErr, data) => {
  if (readErr) {
    console.error("Read error:", readErr);
    return;
  }

  fs.writeFile("./copy.txt", data, "utf-8", (writeErr) => {
    if (writeErr) {
      console.error("Write error:", writeErr);
    } else {
      console.log("File copied successfully!");
    }
  });
});
