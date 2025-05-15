const express = require("express");
const jwt = require("jsonwebtoken");
const router = require("./routes/publicRoutes");
const workerRouter = require("./routes/privatRoutes");

// const mongoose = require("mongoose");
const { connectToDb } = require("./db");
const { jwtMiddleware } = require("./middleware");
const cookieParser = require("cookie-parser");

const app = express();
connectToDb();

app.use(express.json());
app.use(cookieParser());

app.use("/", router);
app.use("/auth/login", router);
app.use("/auth/register", router);
app.use("/workers", jwtMiddleware, workerRouter);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
