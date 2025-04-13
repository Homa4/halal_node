const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.end("Home page");
  } else if (req.url === "/about") {
    res.setHeader("Content-Type", "text/html");
    res.end("About us");
  } else {
    res.setHeader("Content-Type", "text/plain");
    res.end("Oooops, 404");
  }
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});
