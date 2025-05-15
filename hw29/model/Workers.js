const mongoose = require("mongoose");

const workersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    collection: "workers",
    timestamps: true,
  }
);

module.exports = workersSchema;
