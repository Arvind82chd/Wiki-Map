const PORT = process.env.PORT || 3000;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

module.exports = {
  PORT,
  sassMiddleware,
  express,
  app,
  morgan
};
