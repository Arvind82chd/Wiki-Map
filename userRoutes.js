const bcrypt = require('bcryptjs');

module.exports = function(router, database) {

  // Create a new user
  router.post('/', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.send("🤗");
    })
    .catch(e => res.send(e));
  });

  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */
  const login =  function(email, password) {
    return database.getUserWithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  }
  exports.login = login;

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.send({user: {name: user.name, email: user.email, id: user.id}});
      })
      .catch(e => res.send(e));
  });

  router.post('/logout', (req, res) => {
    req.session.userId = null;
    res.send({});
  });

  router.get("/me", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({message: "not logged in"});
      return;
    }

    database.getUserWithId(userId)
      .then(user => {
        if (!user) {
          res.send({error: "no user with that id"});
          return;
        }

        res.send({user: {name: user.name, email: user.email, id: userId}});
      })
      .catch(e => res.send(e));
  });

  return router;
}


// old routes
// app.get("/login", (req, res) => {
//   const userId = req.session.user_id;
//   const templateVars = {
//     user: users[userId]
//   };
//   res.render("login", templateVars);
// });

// app.get("/register", (req, res) => {
//   const userId = req.session.user_id;
//   const templateVars = {
//     user: users[userId]
//   };
//   res.render("register", templateVars);
// });

// // receive info from register form
// app.post('/register', (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   // show error message if email or password is blank
//   if (!email || !password) {
//     res.status(401).send('email and password cannot be blank');
//     return;
//   }

//   const user = findUserByEmail(email, users);
//   let userId = Math.random().toString(36).substr(2, 8);
//   if (user) {
//     res.status(403).send('User already exists!');
//     return;
//   }
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//       users[userId] = {
//         id: userId,
//         email: email,
//         password: hash
//       };
//       req.session.user_id = userId;
//       res.redirect('/');
//     });
//   });
// });

// // receive info from login form
// app.post('/login', (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const user = findUserByEmail(email, users);

//   bcrypt.compare(password, user.password, (err, response) => {
//     // res == true or res == false
//     if (response) {
//       req.session.user_id = user.id;
//       res.redirect('/');
//       return;
//     }
//     res.status(401).send('wrong credentials!');
//   });

// });

// // handle logout
// app.post('/logout', (req, res) => {
//   req.session = null;
//   res.redirect('/');
// });
