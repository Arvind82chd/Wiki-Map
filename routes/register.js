const express = require('express');
const router = express.Router();
module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });
  router.post('/register', (req, res) => {
    const email_id = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const user_id = (/*user_id to be assigned from db's sequence*/);
    users[user_id] = {
      id: user_id,
      name: name,
      email: email_id,
      password: password
    }

  });
  return router;

};
