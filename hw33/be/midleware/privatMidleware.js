const { verifyToken } = require("../token/tokenFun");
const jwt = require("jsonwebtoken");
const config = require("../token/configToken");

function midleware(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  console.log("midleware triggered");
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.worker = decoded.obgToSign;
    next();
  });
}

module.exports = { midleware };
