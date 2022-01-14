const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register", {user: req.session.email});
  });
  router.post("/", (req, res) => {
    const body = req.body;
    console.log(body);

    // check db if email exists
    db.query(`SELECT * FROM users WHERE email = $1;`, [body.email])
      .then(async data => {
        console.log(data.rows)
        if (data.rows.length > 0) {
          console.log('email exists')
          res.render("register", {error: 'this email already exists'})
        }
        const hashed_pass = await bcrypt.hash(body.password, 12);
        db.query(`INSERT INTO users (
             email, password, name)
             VALUES (
             $1, $2, $3) RETURNING *;`, [body.email, hashed_pass, body.name])
          .then(
            data => {
              data.rows[0];
              req.session.email = data.rows[0].email;
              res.render("index", {user: req.session.email})
            }
          )
      })
    // if exists throw error

    // if email doesn't exist hash password and insert email and password into database

    // create session (cookie)

    // redirect to index


    //   db.query(`INSERT INTO users (
    //     name, email, password)
    //     VALUES (
    //     $1, $2, $3);`, [body.email])
    //     .then(data => {
    //       console.log("password", data);
    //       if (data.rows[0].password === body.password) {
    //         res.cookie("user_id", data.rows[0].id);
    //         res.redirect("/api");
    //       } else {
    //         res
    //           .status(401)
    //           .json({
    //             error: "incorrect password"
    //           });
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       res
    //         .status(500)
    //         .json({
    //           error: err.message
    //         });
    //     });
  });
  return router;
};
