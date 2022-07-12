// Auth Controller

const { authSrv } = require("../services/authSrv.js");

const login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    //!TODO - validate input

    const user = await authSrv.login(username, password);
    const token = authSrv.genToken(user);
    res.cookie("jwt_token", token, { httpOnly: true }).json({
      message: "Login successfull",
      status: "OK",
      username: user.username,
      role: user.role,
      email: user.email,
    });
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
    res.status(201).json({
      status: "OK",
      message: "Registratoin successfull",
      username: user.username,
    });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  res.clearCookie("jwt_token").json({
    message: "Logout successfull",
  });
};

//!TODO
// reset password
// delete account

exports.authCtl = { login, register, logout };
