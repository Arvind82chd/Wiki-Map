const express = require('express');
const router = express.Router();
const {
  Pool
} = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm',
  port: '5432'
});
const getIdFromEmail = email => {
  const queryString = `SELECT id FROM users WHERE email = $1;`;
  const values = [email];

  return pool
    .query(queryString, values)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack))
}

const getMaps = () => {
  const queryString = `SELECT title FROM map`;
  return pool
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack))
}

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("maps_add", {
      user: req.session.email
    });
  });


  // check db if map exists
  // if exists throw error
  // if map doesn't exist insert map into db

  router.post("/", (req, res) => {
    const body = req.body;
    console.log('body:', body);

    // check db if map exists
    // if exists throw error
    // if email doesn't exist hash password and insert email and password into database
    // create session (cookie)

    // redirect to index
    db.query(`SELECT * FROM map WHERE title = $1;`, [body.title])
      .then(async data => {
        console.log('data.rows:', data.rows)

        if (data.rows.length !== 0) {
          console.log('map exists')
          res.render("maps_add", {
            error: 'this map already exists',
            user: null
          })
        } else {
          let users = await getIdFromEmail(req.session.email)
          db.query(`INSERT INTO map (
            title, user_id, latitude, longitude)
            VALUES ($1, $2, 123, 123) RETURNING *;`, [body.title, users.id])
            .then(
              data => {
                console.log(data.rows)
                data.rows[0];
                res.render("index", {
                  user: req.session.email,
                  maps: getMaps
                });
              }
            )
            .catch(error => {
              console.log(error)
            })
        }

      })
      .catch(error => {
        console.log(error)
      })
  });

  return router;
};
