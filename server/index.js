require("dotenv").config();
const express = require("express");

const { dbConnect } = require("./config/database.js");
const route = require("./routes.js");

const port = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(route);

app.listen(port, () => {
  dbConnect();
  console.log(`Server listening on port: ${port}...`);
});
