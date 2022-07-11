// Users model

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already exist"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exist"],
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);