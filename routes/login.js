const express = require('express');
const { bcrypt } = require('../constants');
const router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm',
  port: '5432'
});

const getMaps = () => {
  const queryString = `SELECT title FROM map;`;
  return pool
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error(e.stack))
}

module.exports = (db) => {
  router.get("/", async (req, res) => {
    const user = req.session.email; //to check user loged in
    const maps = await getMaps(); //because we want to send maps data to the index.ejs
    res.render("login", {user: user, maps: maps});
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
      .then(async data => {
          console.log('data:', data.rows)
          let maps = await getMaps()
          if (data.rows[0]) {
            bcrypt.compare(password, data.rows[0].password, (err, response) => {
              if (response) {

                req.session.email = data.rows[0].email;
                res.render("index", {
                  user: req.session.email,
                  maps: maps
                });
                return
              }

            })
          } else {
            res.render("login", {
              error: 'wrong credentials',
              user: null,
              maps: null
            })
          }
        })
  })
  return router;
};
