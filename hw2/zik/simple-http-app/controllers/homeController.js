const parseBody = require('../utils/parseBody');
const renderHTML = require('../utils/renderHTML');

exports.home = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Головна сторінка');
};

exports.about = (req, res) => {
  renderHTML(res, 'about.html');
};

exports.submit = async (req, res) => {
  const body = await parseBody(req);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Форма прийнята', data: body }));
};