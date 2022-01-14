const express = require('express');
const {
  bcrypt
} = require('../constants');
const router = express.Router();
module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login", {
      user: req.session.email
    });
  });

  // get credentials from user input
  // locate user from db
  // compare password from db and user input with bcrypt
  // if match register session and redirect to index
  router.post("/", (req, res) => {
    const body = req.body;
    const password = req.body.password;
    console.log(body)
    db.query(`SELECT * FROM users WHERE email = $1;`, [body.email])
      .then(
        data => {
          console.log('data:', data.rows)
          if (data.rows[0]) {
            bcrypt.compare(password, data.rows[0].password, (err, response) => {
              if (response) {
                req.session.email = data.rows[0].email;
                res.render("index", {
                  user: req.session.email
                });
                return
              }

            })
          } else {
            res.render("login", {
              error: 'wrong credentials',
              user: null
            })
          }
        })
  })
  return router;
};
