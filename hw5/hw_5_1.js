const fs = require("fs");
const { createHmac } = require("node:crypto");
const bcrypt = require("bcrypt");

const secret = "homa";

const pass1 = 12345;
const pass2 = 54321;
const pass3 = 10010;
const pass4 = 88888;
const pass5 = 54321;

const arrOfPass = [pass1, pass2, pass3, pass4, pass5];
const arrOfHash = [];

arrOfPass.forEach((pass) => {
  const hash = createHmac("sha256", secret).update(`${pass}`).digest("hex");
  arrOfHash.push(hash);
});

for (let i = 0; i < arrOfPass.length; i++) {
  bcrypt.compare(arrOfPass[i], arrOfHash[i], (err, result) => {
    if (result) {
      console.log("✅ right");
    } else {
      console.log("❌ left");
    }
  });
}

console.log(arrOfHash);
