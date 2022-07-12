const User = require("../models/User.js");

const getUser = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    throw err;
  }
};

const getAll = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (err) {
    throw err;
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return user;
  } catch (err) {
    throw err;
  }
};

const delUser = async (id) => {
  try {
    const result = await User.findByIdAndDelete(id);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.userSrv = { getAll, getUser, updateUser, delUser };
