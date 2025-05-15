const { SECRET_KEY, expiresIn } = require("./secrete_info/variables");
const jwt = require("jsonwebtoken");

function jwtMiddleware(req, res, next) {
  const token = req.cookies?.token;
  try {
    req.user = jwt.verify(token, SECRET_KEY);
    next();
  } catch (err) {
    res.clearCookie("token");
    res.status(401).send("🙅 nonono mister fish");
    console.error("👹 hehehe, something went wrong:\n", err);
  }
}

module.exports = { jwtMiddleware };
