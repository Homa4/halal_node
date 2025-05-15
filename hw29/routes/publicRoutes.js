require("paint-console");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();
const workersSchema = require("../model/Workers");
const { SECRET_KEY, expiresIn } = require("../secrete_info/variables");

const Worker = mongoose.model("worker", workersSchema, "workers");

let access_token;

async function isAuthenticated({ email, password }) {
  if (!email) {
    return res.status(400).json({ error: "No email provided" });
  }

  const worker = Worker.findOne({ email, password });
  console.log(worker.body);
  return worker;
}

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

router.get("/", (req, res) => {
  res.status(200).send("wellcome my friend");
});

router.post("/auth/register", (req, res) => {
  try {
    Worker.create(req.body);
    res.status(201).send("😘 worker successfully was added");
  } catch (err) {
    console.error("👹 hehehe, failed:\n", err);
    res.status(400).json({ error: err.message });
  }
});

router.post("/auth/login", async (req, res) => {
  console.log("login endpoint called; request body:");
  const { email, password } = req.body;

  console.time("isAuthenticated");
  const authenticated = await isAuthenticated({ email, password });
  console.timeEnd("isAuthenticated");

  console.warn(authenticated);
  if (Boolean(authenticated) === false) {
    const status = 401;
    const message = "Incorrect email or password";
    console.error("👹 hehehe, failed");
    res.clearCookie("token");
    res.status(status).json({ status, message });
    return;
  } else {
    access_token = createToken({ email, password });
    res.cookie("token", access_token, {
      httpOnly: true,
    });
    console.warn("Access Token:\n" + access_token);
    console.info("✅ Successful authentication");
    res.status(200).send("Successful authentication");
  }
});

module.exports = router;
