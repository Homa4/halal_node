const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

const users = [
  { name: "Anna", age: 25, email: "anna@example.com" },
  { name: "Inna", age: 30, email: "inna@example.com" },
  { name: "Alex", age: 22, email: "alex@example.com" },
];

app.get("/", (req, res) => {
  res.render("index", { users });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
