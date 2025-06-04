const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const Worker = require("../db/model/worker");
const chalk = require("chalk");

const app = express();
app.use(express.json());
const privateRoute = express.Router();

privateRoute.post("/profile", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const data = await Worker.findOne({ email, password });
    console.log(chalk.bgGreen("Your profile"));
    res.status(200).send(data);
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

privateRoute.post("/addWorker", async (req, res) => {
  console.log("req.body: \n", req.body);

  const workerFullData = req.body;

  console.log("Role being stored:", workerFullData.role);

  try {
    const result = await Worker.insertOne(workerFullData);
    console.log(chalk.bgGreen("Worker added with role:", workerFullData.role));
    console.log("Inserted document ID:", result.insertedId);

    res.status(200).json({
      message: "✅ Worker successfully added",
      insertedId: result.insertedId,
      role: workerFullData.role,
    });
  } catch (err) {
    console.log(`Error adding worker:\n`, err);
    res.status(500).json({
      message: "😅 Failed adding worker",
      error: err.message,
    });
  }
});

privateRoute.post("/findWorker", async (req, res) => {
  const { email } = req.body;
  try {
    const worker = await Worker.findOne({ email });
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    return res.status(200).json(worker);
  } catch (err) {
    console.error("Error getting worker:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

privateRoute.delete("/deleteWorker", async (req, res) => {
  const emailToDelete = req.body.email;
  console.log("emailToDelete:\n", emailToDelete);
  try {
    await Worker.deleteOne({ email: emailToDelete });
    return res.status(200).send("worker deleted");
  } catch (err) {
    console.error(chalk.bgRedBright("Error deleting worker:", err));
    return res
      .status(500)
      .json({ message: "Server error while deleting worker" });
  }
});

module.exports = privateRoute;
