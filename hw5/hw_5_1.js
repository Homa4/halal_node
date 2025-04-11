const fs = require("fs");
const crypto = require("crypto");
const { createHmac } = require("node:crypto");
const bcrypt = require("bcrypt");

const secret = "homa";

const pass1 = "12345";
const pass2 = "54321";
const pass3 = "10010";
const pass4 = "88888";
const pass5 = "54321";

const arrOfPass = [pass1, pass2, pass3, pass4, pass5];
const arrOfHash = [];

arrOfPass.forEach((pass) => {
  const hash = crypto
    .createHash("sha256", secret)
    .update(`${pass}`)
    .digest("hex");
  arrOfHash.push(hash);
});

for (let i = 0; i < arrOfHash.length; i++) {
  const newHash = crypto
    .createHash("sha256", secret)
    .update(`${arrOfPass[i]}`)
    .digest("hex");
  const hashBufferPass = Buffer.from(arrOfHash[i], "hex");
  const checkBufferPass = Buffer.from(newHash, "hex");
  if (crypto.timingSafeEqual(hashBufferPass, checkBufferPass)) {
    console.log("✅ success");
  } else {
    console.log("❌ failed");
  }
}

// console.log(arrOfHash);
