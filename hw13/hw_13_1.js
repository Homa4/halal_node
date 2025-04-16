const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  try {
    // res.writeHead(200, { "content-type": "aplication/html" });
    app.set("view engine", "pug");
    app.set("views", "./views");
    res.render("index", { title: "Shalom", message: "message" });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
