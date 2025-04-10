const crypto = require("crypto");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

const data = "some data to sent";

const sign = crypto.createSign("sha256");
sign.update(data);
sign.end();
const signature = sign.sign(privateKey);

const verify = crypto.createVerify("SHA256");
verify.write(data);
verify.end();
console.log(verify.verify(publicKey, signature, "hex"));
