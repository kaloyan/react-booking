const route = require("express").Router();

// import controllers
const { authCtl } = require("./controllers/authCtl.js");
const { hotelsCtl } = require("./controllers/hotelsCtl.js");

// import middlewares
const { err } = require("./middlewares/errorHandler.js");

// define all paths

route.post("/auth/login", authCtl.login, err);
route.post("/auth/register", authCtl.register, err);

route.get("/api/v1/hotels", hotelsCtl.getAll, err);
route.get("/api/v1/hotels/:id", hotelsCtl.getOne, err);
route.post("/api/v1/hotels", hotelsCtl.create, err);
route.put("/api/v1/hotels/:id", hotelsCtl.update, err);
route.delete("/api/v1/hotels/:id", hotelsCtl.del, err);

// route.get("/api/v1/rooms", apiCtl.rooms);
// route.get("/api/v1/users", apiCtl.users);

route.get("*", (req, res) => {
  res.json({ message: "404" });
});

module.exports = route;
