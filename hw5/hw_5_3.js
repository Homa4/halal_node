const { createHmac } = require("crypto");
const crypto = require("crypto");

function hashPassword(password) {
  const secrete = crypto.randomBytes(8).toString();
  //   const secrete = "homa";
  const hmac = createHmac("sha256", secrete).update(password).digest("hex");
  return [hmac, secrete];
}

const password = "12345";
const [hmacOld, secrete] = hashPassword(password);
const bufferHashOld = Buffer.from(hmacOld, "hex");
const hmacNew = createHmac("sha256", secrete).update(password).digest("hex");
const bufferHashNew = Buffer.from(hmacNew, "hex");

if (crypto.timingSafeEqual(bufferHashOld, bufferHashNew)) {
  console.log("✅ success");
} else {
  console.log("❌ failed");
}

console.log("--hmacNew--", hmacNew);
console.log("--hmacOld--", hmacOld);

// if (hmacOld === hmacNew) {
//   console.log("✅ success");
// } else {
//   console.log("❌ failed");
// }
