const express = require("express");
const cors = require("cors");
const passport = require("passport");
const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

module.exports = app;
