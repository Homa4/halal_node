const express = require("express");

const app = express();

app.get("/", (req, res) => {
  try {
    res.status(200).send("welcome my friend");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
