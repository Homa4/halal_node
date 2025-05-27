const jwt = require("jsonwebtoken");
const config = require("./configToken");

function sign(email, password) {
  const objToSign = { email: email, password: password };
  return jwt.sign(objToSign, config.secret, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: "15m",
  });
}

// function verifyToken(req, res, next) {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(403).send({
//       message: "No token provided!",
//     });
//   }

//   jwt.verify(token, config.secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({
//         message: "Unauthorized!",
//       });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// }

module.exports = { sign };
