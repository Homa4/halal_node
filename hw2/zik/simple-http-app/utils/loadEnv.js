const fs = require('fs');

function loadEnv(path = '.env') {
  if (!fs.existsSync(path)) return;

  const lines = fs.readFileSync(path, 'utf-8').split('\n');

  lines.forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
}

module.exports = loadEnv;