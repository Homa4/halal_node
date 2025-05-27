const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const Worker = require("../db/model/worker");
const { sign } = require("../token/tokenFun");
const chalk = require("chalk");

const app = express();
app.use(express.json());
const route = express.Router();

route.get("/", (req, res) => {
  try {
    res.status(200).send("<h1>hi</h1>");
  } catch (err) {
    console.log("problem in rendering main page:\n", err);
  }
});

route.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const token = sign(email, password);
  try {
    const list = await Worker.insertOne(req.body.newWorker);
    console.log(chalk.bgGreen("You registered"));
    res.status(201).cookie("token", token).send(list);
  } catch (err) {
    console.log(chalk.bgRedBright(`error registering worker :\n`), err);
  }
});

route.get("/login", async (req, res) => {
  const { email, password } = req.body;
  const token = sign(email, password);
  console.log(token);
  try {
    const list = await Worker.findOne(req.body.newWorker);
    console.log(chalk.bgGreen("You logged in"));
    res.status(200).cookie("token", token).send(list.data);
  } catch (err) {
    console.log(chalk.bgRedBright(`error adding worker :\n`), err);
  }
});

route.get("/logout", async (req, res) => {
  const token = undefined;
  console.log(token);
  try {
    console.log(chalk.bgGreen("You logged out"));
    res.status(200).cookie("token", token).end();
  } catch (err) {
    console.log(chalk.bgRedBright(`error adding worker :\n`), err);
  }
});
module.exports = route;
