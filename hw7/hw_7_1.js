const crypto = require("crypto");

function hashPassword(password) {
  const secrete = "homa";
  const passHash = crypto
    .createHash("sha256", secrete)
    .update(password)
    .digest("hex");
  //   passHash.update(password);
  //   passHash.digest("hex");

  return passHash;
}

console.log("👀", hashPassword("12345"));
