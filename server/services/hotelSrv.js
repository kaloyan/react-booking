const Hotel = require("../models/Hotel.js");

const getAll = async () => {
  try {
    const hotels = await Hotel.find({});
    return hotels;
  } catch (err) {
    throw err;
  }
};

const getOne = async (id) => {
  try {
    const hotel = await Hotel.findById(id);
    return hotel;
  } catch (err) {
    throw err;
  }
};

const create = async (data) => {
  try {
    const newHotel = new Hotel(data);
    await newHotel.save();
    return newHotel;
  } catch (err) {
    throw err;
  }
};

const update = async (id, data) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return hotel;
  } catch (err) {
    throw err;
  }
};

const del = async (id) => {
  try {
    const result = await Hotel.findByIdAndDelete(id);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.hotelSrv = { getAll, getOne, create, update, del };
