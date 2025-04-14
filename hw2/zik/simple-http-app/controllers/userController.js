const parseBody = require('../utils/parseBody');

exports.getUser = (req, res) => {
  const { id } = req.params;
  const { debug } = req.query;

  const response = {
    message: `Користувач з ID: ${id}`,
    debug: debug === 'true' ? 'Детальний режим' : undefined
  };

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(response));
};

exports.createUser = async (req, res) => {
  const body = await parseBody(req);
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Користувача створено', data: body }));
};