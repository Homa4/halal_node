const crypto = require("crypto");

function hashPassword(password, salt) {
  return new Promise((resolve, reject) => {
    const iterations = 50000;
    const keylen = 64;
    const digest = "sha512";

    crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, key) => {
      if (err) {
        reject(err);
      } else {
        resolve(key.toString("hex"));
      }
    });
  });
}

hashPassword("12345", "sjdcinai")
  .then((data) => {
    console.log(data);
  })
  .catch((error) => [console.log(error)]);
