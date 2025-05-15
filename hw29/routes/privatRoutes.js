require("paint-console");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const workerRouter = express.Router();
const workersSchema = require("../model/Workers");

const Worker = mongoose.model("worker", workersSchema, "workers");

workerRouter.get("/", async (req, res) => {
  // console.warn("req.user", res.user);
  try {
    const workers = await Worker.find();
    const jsonWorkers = JSON.stringify(workers);
    res.status(200).send(jsonWorkers);
    console.info(jsonWorkers);
  } catch (err) {
    console.error("👹 hehehe, something went wrong:\n", err);
  }
});

module.exports = workerRouter;
