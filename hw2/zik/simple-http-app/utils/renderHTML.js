const fs = require('fs');
const path = require('path');

function renderHTML(res, filename) {
  const filePath = path.join(__dirname, '../views', filename);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Помилка рендерингу');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}

module.exports = renderHTML;