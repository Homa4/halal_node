const fs = require("fs");
const path = require("path");

module.exports = function logger(req, res) {
  const loggerObj = {
    time: new Date().toISOString(),
    method: req.method,
    url: req.url,
    headers: req.headers,
    ip: req.socket.remoteAddress,
    port: req.socket.remotePort,
    localPort: req.socket.localPort,
  };

  const stringifyLoggerObj = JSON.stringify(loggerObj, null, 2) + "\n\n";

  const logPath = path.join(__dirname, "text.txt");
  fs.appendFileSync(logPath, stringifyLoggerObj, "utf8");

  console.log(loggerObj);
};
