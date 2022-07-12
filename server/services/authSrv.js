// Auth service
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User.js");

const register = async (username, email, password, role) => {
  const hashPass = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      username,
      email,
      password: hashPass,
      role,
    });

    await newUser.save();

    return newUser;
  } catch (err) {
    throw err;
  }
};

const login = async (username, password) => {
  // console.log(username, password);
  try {
    const usr = await User.findOne({ username }).exec();
    console.log(usr);

    if (!usr) throw { message: "Invalid username or password" };

    const isValid = await bcrypt.compare(password, usr.password);

    if (!isValid) throw { message: "Invalid username or password" };

    return usr;
  } catch (err) {
    throw err;
  }
};

const genToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    role: user.role,
  };

  const options = {
    expiresIn: "7d",
  };

  try {
    const token = jwt.sign(payload, process.env.JWT_KEY, options);
    return token;
  } catch (err) {
    throw err;
  }
};

exports.authSrv = { register, login, genToken };
