const route = require("express").Router();

// import controllers
const { authCtl } = require("./controllers/authCtl.js");
const { hotelsCtl } = require("./controllers/hotelsCtl.js");
const { userCtl } = require("./controllers/userCtl.js");
const { roomCtl } = require("./controllers/roomCtl.js");

// import middlewares
const { err } = require("./middlewares/errorHandlerMW.js");
const { isAuth } = require("./middlewares/authMW.js");
const { guard } = require("./middlewares/guardsMW.js");

route.use(isAuth);

// define all paths

// authentication routes
route.post("/auth/login", guard.isGuest, authCtl.login, err);
route.post("/auth/register", guard.isGuest, authCtl.register, err);
route.get("/auth/logout", authCtl.logout, err);

// hotels API routes
route.get("/api/v1/hotels", hotelsCtl.getAll, err);
route.get("/api/v1/hotels/:id", hotelsCtl.getOne, err);
route.post("/api/v1/hotels", hotelsCtl.create, err);
route.put("/api/v1/hotels/:id", hotelsCtl.update, err);
route.delete("/api/v1/hotels/:id", hotelsCtl.del, err);

// rooms API routes
route.get("/api/v1/rooms", roomCtl.getAll, err);
route.get("/api/v1/rooms/:id", roomCtl.getOne, err);
route.post("/api/v1/rooms/:hotelId", roomCtl.create, err);
route.put("/api/v1/rooms/:id", roomCtl.update, err);
route.delete("/api/v1/rooms/:id", roomCtl.del, err);

// users API routes
route.get("/api/v1/users", guard.isAdmin, userCtl.getAll, err);
route.get("/api/v1/users/:id", userCtl.getUser, err);
route.put("/api/v1/users/:id", userCtl.updateUser, err);
route.delete("/api/v1/users/:id", userCtl.delUser, err);

// define 404 not found route
route.get("*", (req, res) => {
  res.status(404).json({ status: 404, message: "Not found" });
});

module.exports = route;
