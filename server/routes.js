const route = require("express").Router();

// import controllers
const { authCtl } = require("./controllers/authCtl.js");
const { hotelsCtl } = require("./controllers/hotelsCtl.js");
const { userCtl } = require("./controllers/userCtl.js");

// import middlewares
const { err } = require("./middlewares/errorHandler.js");
const { isAuth } = require("./middlewares/authMiddleware.js");

route.use(isAuth);

// define all paths

route.post("/auth/login", authCtl.login, err);
route.post("/auth/register", authCtl.register, err);
route.get("/auth/logout", authCtl.logout, err);

route.get("/api/v1/hotels", hotelsCtl.getAll, err);
route.get("/api/v1/hotels/:id", hotelsCtl.getOne, err);
route.post("/api/v1/hotels", hotelsCtl.create, err);
route.put("/api/v1/hotels/:id", hotelsCtl.update, err);
route.delete("/api/v1/hotels/:id", hotelsCtl.del, err);

// route.get("/api/v1/rooms", apiCtl.rooms);

route.get("/api/v1/users", userCtl.getAll, err);
route.get("/api/v1/users/:id", userCtl.getUser, err);
route.put("/api/v1/users/:id", userCtl.updateUser, err);
route.delete("/api/v1/users/:id", userCtl.delUser, err);

route.get("*", (req, res) => {
  res.status(404).json({ status: 404, message: "Not found" });
});

module.exports = route;
