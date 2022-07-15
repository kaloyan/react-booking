// Auth Controller

const { authSrv } = require("../services/authSrv.js");

const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    //!TODO - validate input

    const user = await authSrv.login(email, password);

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
  let role = req.body.role;

  // validate role
  if (role !== "user" && role !== "owner") {
    role = "user";
  }

  try {
    //!TODO - validate inputs
    if (password !== rePass) {
      throw { status: 500, message: "Passwords don't match" };
    }

    const user = await authSrv.register(username, email, password, role);

    const token = authSrv.genToken(user);

    res.cookie("jwt_token", token, { httpOnly: true }).status(201).json({
      message: "Registratoin successfull",
      status: "OK",
      username: user.username,
      role: user.role,
      email: user.email,
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

const account = (req, res, next) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(203).send([]);
  }
};

exports.authCtl = { login, register, logout, account };
