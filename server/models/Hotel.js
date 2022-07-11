const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },

  type: {
    type: String,
    required: [true, "Type is required"],
  },

  city: {
    type: String,
    required: [true, "Ciry is required"],
  },

  address: {
    type: String,
    required: [true, "Address is required"],
  },

  distance: {
    type: String,
    required: [true, "Distance is required"],
  },

  pictures: {
    type: [String],
    default: [],
  },

  description: {
    type: String,
    required: [true, "Description is required"],
  },

  title: {
    type: String,
    required: [true, "Title is required"],
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  rooms: {
    type: [mongoose.Types.ObjectId],
    ref: "Room",
  },

  cheepestPrice: {
    type: Number,
    required: [true, "Cheapest room price is required"],
  },

  featured: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("hotel", hotelSchema);
