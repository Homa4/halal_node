const express = require("express");
require("dotenv").config();
const route = require("./routes/router");
const privateRoute = require("./routes/privateRoutes");
const privatMidleware = require("./midleware/privatMidleware");
const { connectToDb } = require("./db/connection/connection");
const cookieParser = require("cookie-parser");

// PORT = process.env.PORT;
const app = express();
connectToDb();

app.use(express.json());
app.use(cookieParser());

app.use("/public", route);
app.use("/private", privatMidleware.midleware, privateRoute);

module.exports = app;
