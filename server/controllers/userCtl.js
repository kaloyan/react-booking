// Users Controller

const { userSrv } = require("../services/userSrv.js");

const getUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await userSrv.getUser(userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  const users = await userSrv.getAll();
  res.json(users);
};

const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const data = req.body;

  try {
    const user = await userSrv.updateUser(userId, data);
    res.json({
      status: "OK",
      message: `User ${result.username} updated successfull`,
    });
  } catch (err) {
    next(err);
  }
};

const delUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const result = await userSrv.delUser(userId);
    res.json({
      status: "OK",
      message: `User ${result.username} deleted successfull`,
    });
  } catch (err) {
    next(err);
  }
};

exports.userCtl = { getUser, getAll, updateUser, delUser };
