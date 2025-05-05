const express = require("express");
const connectToDb = require("./db");
const routes = require("./routes");

const app = express();
connectToDb();

app.use("/", routes);
app.use("/getAllSmartphones", routes);
app.use("/calculateTotalProfit", routes);
app.use("/updateNumOfitems", routes);
app.use("/order", routes);
app.use("/topItems", routes);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
