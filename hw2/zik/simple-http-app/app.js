const http = require('http');
const url = require('url');
const loadEnv = require('./utils/loadEnv');
const logger = require('./utils/logger');
const routes = require('./routes');

// Завантажити .env
loadEnv();

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  req.pathname = parsedUrl.pathname;
  req.query = parsedUrl.query;

  logger(req);

  for (const route of routes) {
    const match = route.match(req.method, req.pathname);
    if (match) {
      req.params = match.params;
      return route.handler(req, res);
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
});

server.listen(PORT, () => {
  console.log(`🚀 ${process.env.APP_NAME} слухає порт ${PORT}`);
});