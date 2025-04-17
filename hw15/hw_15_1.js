const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const PORT = 3000;

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

const users = [
  { name: "Олена", age: 28, email: "olena@example.com" },
  { name: "Тарас", age: 35, email: "taras@example.com" },
  { name: "Юлія", age: 22, email: "yulia@example.com" },
];

app.get("/", (req, res) => {
  res.render("users", { users });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
