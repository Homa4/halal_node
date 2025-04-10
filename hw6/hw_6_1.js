const { createSign, createVerify, generateKeyPairSync } = require("crypto");

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

const data = "crypto to sign";

const sign = createSign("SHA256");
sign.update(data);
sign.end();
const signature = sign.sign(privateKey, "hex");
console.log("Signature:", signature);

const verify = createVerify("SHA256");
verify.update(data);
verify.end();
const isVerified = verify.verify(publicKey, signature, "hex");
console.log("Signature chaeck:", isVerified);
