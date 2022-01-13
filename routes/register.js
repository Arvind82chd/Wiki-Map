const express = require('express');
const router = express.Router();
module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });
  router.post("/", (req, res) => {
    const body = req.body;
    db.query(`SELECT * FROM users WHERE email = $1;`, [body.email])
      .then(data => {
        console.log("password", data);
        if (data.rows[0].password === body.password) {
          res.cookie("user_id", data.rows[0].id);
          res.redirect("/api");
        } else {
          res
            .status(401)
            .json({
              error: "incorrect password"
            });
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });
  return router;
};
