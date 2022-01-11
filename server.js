// load .env data into process.env
require("dotenv").config();

// Constants
const {
  PORT,
  sassMiddleware,
  express,
  app,
  morgan,
  cookieSession,
  bcrypt,
  users,
  findUserByEmail,
  generateRandomString
} = require('./constants');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// cookie-session
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const userId = req.session.user_id;
  const templateVars = {
    user: users[userId]
  };
  res.render("index", templateVars);
});

app.get("/login", (req, res) => {
  const userId = req.session.user_id;
  const templateVars = {
    user: users[userId]
  };
  res.render("login", templateVars);
});

app.get("/register", (req, res) => {
  const userId = req.session.user_id;
  const templateVars = {
    user: users[userId]
  };
  res.render("register", templateVars);
});

// receive info from register form
app.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // show error message if email or password is blank
  if (!email || !password) {
    res.status(401).send('email and password cannot be blank');
    return;
  }

  const user = findUserByEmail(email, users);
  let userId = Math.random().toString(36).substr(2, 8);
  if (user) {
    res.status(403).send('User already exists!');
    return;
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      users[userId] = {
        id: userId,
        email: email,
        password: hash
      };
      req.session.user_id = userId;
      res.redirect('/');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
