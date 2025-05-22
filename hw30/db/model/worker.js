const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const workershema = new Schema({
  name: String,
  age: Number,
  position: String,
  salary: Number,
  email: String,
  password: String,
});

const Worker = model("Worker", workershema);
module.exports = Worker;
