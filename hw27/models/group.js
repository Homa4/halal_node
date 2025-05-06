const mongoose = require("mongoose");

const { Schema } = mongoose;

const Group = new Schema({
  name: { type: String },
  age: { type: Number },
  group: { type: String },
  marks: [{ type: Number }],
});

module.exports = Group;
