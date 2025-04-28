const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  res.send("Wellcome my friend");
});

router.get("/about", (req, res) => {
  res.send("I will tell you a story about us");
});

router.get("/readFile", (req, res) => {
  try {
    const path = "./text.txt";
    const data = fs.readFileSync(path, "utf8");
    res.status(200).send(data + "\n");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error reading file, ooops 🐭");
  }
});

module.exports = router;
