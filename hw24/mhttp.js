const http = require("http");

let current = 0;

const servers = [
  { host: "localhost", port: 3001 },
  { host: "localhost", port: 3002 },
  { host: "localhost", port: 3003 },
];

const server = http.createServer((req, res) => {
  const target = servers[current];
  current = (current + 1) % servers.length;
  const options = {
    hostname: target.host,
    port: target.port,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxy = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  res.pipe(proxy);

  proxy.on("error", (err) => {
    console.error("Proxy error:", err);
    res.writeHead(502);
    res.end("Bad Gateway");
  });
});

server.listen(8000, () => {
  console.log("http://localhost:8000");
});
