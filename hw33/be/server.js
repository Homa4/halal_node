const app = require("./app");
require("dotenv").config();
const chalk = require("chalk");
const cors = require("cors");

// now cors enabled for all requests 🐭
// app.use(cors());

PORT = 8080 || process.env.PORT;
app.listen(PORT, () => {
  console.log(chalk.bgGreen.white(`http://localhost:${PORT}`));
});
