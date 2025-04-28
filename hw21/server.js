const express = require("express");

const app = express();

app.use("/", require("./routes"));
app.use("/about", require("./routes"));
app.use("/readFile", require("./routes"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
