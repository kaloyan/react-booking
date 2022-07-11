// Auth Controller

const { authSrv } = require("../services/authSrv.js");

const login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await authSrv.login(username, password);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const rePass = req.body.rePass;

  try {
    //!TODO - validate inputs
    if (password !== rePass) {
      throw { status: 500, message: "Passwords dont match" };
    }

    const user = await authSrv.register(username, email, password, "user");
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.authCtl = { login, register };
