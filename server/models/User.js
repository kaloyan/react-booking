// Users model

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [30, "Username is too long"],
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
      enum: ["user", "owner", "admin"],
      default: "user",
    },

    messages: {
      type: [String],
      default: ["Welcomme to our website."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
