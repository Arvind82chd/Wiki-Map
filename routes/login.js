const express = require('express');
const { bcrypt } = require('../constants');
const router = express.Router();
module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login", {
      user: req.session.email
    });
  });

  // get credentials from user input
  router.post("/", (req, res) => {
    const body = req.body;
    const password = req.body.password;
    db.query(`SELECT * FROM users WHERE email = $1;`, [body.email])
    .then(data => {
      if (data.rows[0]) {
        bcrypt.compare(password, data.rows[0].password, (err, response) => {
          if (response) {
            req.session.email = data.rows[0].email;
            res.render("index", {user: req.session.email});
            return
          }
          res.render("login", {error: 'wrong credentials', user: null})
        })
      }
    })
  })

  // locate user from db

  // compare password from db and user input with bcrypt

  // if match register session and redirect to index


  router.post("/", (req, res) => {
    const body = req.body;
    console.log(body);
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

// const express = require('express');
// const router  = express.Router();

// module.exports = (db) => {

//   router.get("/login", (req, res) => {
//     const userId = req.session.user_id;
//     const templateVars = {
//       user: users[userId]
//     };
//     res.render("login", templateVars);
//   });

//   // router.get("/", (req, res) => {
//   //   res.render("login");
//   // });
//   // router.post("/", (req, res) => {
//   //   const body = req.body;
//   //   db.query(`SELECT * FROM users WHERE email = $1;`, [body.email])
//   //     .then(data => {
//   //       console.log("password", data);
//   //       if(data.rows[0].password === body.password) {
//   //         res.cookie("user_id", data.rows[0].id);
//   //         res.redirect("/api");
//   //       } else {
//   //         res
//   //         .status(401)
//   //         .json({ error: "incorrect password" });
//   //       }
//   //     })
//   //     .catch(err => {
//   //       console.log(err);
//   //       res
//   //         .status(500)
//   //         .json({ error: err.message });
//   //     });
//   // });
//   return router;
// };
