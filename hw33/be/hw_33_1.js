const app = require("./app");
require("dotenv").config();
const chalk = require("chalk");

PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(chalk.bgGreen.white(`http://localhost:${PORT}`));
});
