const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

const products = [
  { name: "Молоко", price: 35, inStock: true },
  { name: "Хліб", price: 20, inStock: false },
  { name: "Сир", price: 85, inStock: true },
  { name: "Кава", price: 120, inStock: false },
];

app.get("/", (req, res) => {
  res.render("index", { products });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
