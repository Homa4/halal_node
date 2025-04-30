const express = require("express");

const app = express();
let current = 0;

const servers = [
  { host: "localhost", port: 3001 },
  { host: "localhost", port: 3002 },
  { host: "localhost", port: 3003 },
];

app.use((req, res) => {
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
    res.status(proxyRes.status);
    Object.entries(proxyRes.headers).forEach(([k, v]) => {
      res.setHeader(k, v);
    });
    proxyRes.pipe(res);
  });

  res.pipe(proxy);

  proxy.on("error", (err) => {
    console.error("Proxy error:", err);
    res.status(502).send("Bad Gateway");
  });
});

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
