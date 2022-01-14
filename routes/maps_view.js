const express = require('express');
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
  // router.post("/api/maps_view/:title", (req, res) => {
  //   let title = req.params.title;
  //   // res.redirect("/maps_view")
  //   res.render("maps_view", {
  //     user: req.session.email,
  //     title: title
  //   });
  // });


  // check db if map exists
  // if exists throw error
  // if map doesn't exist insert map into db

  router.post("/", async (req, res) => {
    const body = req.body;
    let maps = await getMaps()
    let mapTitle = 'map title';
    res.render("maps_view", {user: req.session.email, maps: maps, title: mapTitle})
  });
  return router;
};
