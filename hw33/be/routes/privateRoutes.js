const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const Worker = require("../db/model/worker");
const chalk = require("chalk");

const app = express();
app.use(express.json());
const privateRoute = express.Router();

privateRoute.get("/profile", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body.objToSign.email;
  try {
    const list = await Worker.findOne({ email: req.body.objToSign.email });
    console.log(chalk.bgGreen("Your profile"));
    res.status(200).send(list);
  } catch (err) {
    console.log(`error getting worker:\n`, err);
  }
});

privateRoute.get("/getList", async (req, res) => {
  try {
    const list = await Worker.find();
    console.log(chalk.bgGreen("Got list of all office workers"));
    res.status(200).send(list);
  } catch (err) {
    console.log(`error getting all workers:\n`, err);
  }
});

module.exports = privateRoute;
