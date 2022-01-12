const PORT = process.env.PORT || 3000;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const userRoutes = require('./userRoutes');
const {
  findUserByEmail,
  generateRandomString
} = require('./helpers');

const users = {
  "99ohwc99": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "55widc55": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

module.exports = {
  PORT,
  sassMiddleware,
  express,
  app,
  morgan,
  cookieSession,
  bcrypt,
  bodyParser,
  userRoutes,
  findUserByEmail,
  generateRandomString,
  users
};
