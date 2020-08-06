const path = require("path");
const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv").config();

const app = express();

/**
 * Primary Middleware
 */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * CORS Middleware
 */
if (process.env.NODE_ENV === "development") {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
    );
    next();
  });
}

/**
 * Static Assets
 */
if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });
}

/**
 * API Routes
 */
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));

module.exports = app;
