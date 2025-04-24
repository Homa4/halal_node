const fs = require("fs").promises;
const path = require("path");

function bufferToBinaryString(buf) {
  return [...buf].map((byte) => byte.toString(2).padStart(8, "0")).join(" ");
}

function binaryStringToText(binStr) {
  return binStr
    .trim()
    .split(/\s+/)
    .map((b) => String.fromCharCode(parseInt(b, 2)))
    .join("");
}

async function main() {
  try {
    const inputFile = process.argv[2] || "./text.txt";
    const resolvedPath = path.resolve(inputFile);

    const buffer = await fs.readFile(resolvedPath);
    const binary = bufferToBinaryString(buffer);
    console.log("→ Binary representation:\n", binary);

    const text = binaryStringToText(binary);
    console.log("\n→ Restored text:\n", text);
  } catch (err) {
    console.error("⚠️ Error:", err.message);
    process.exit(1);
  }
}

main();
