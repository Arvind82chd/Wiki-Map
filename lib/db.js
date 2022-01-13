const { Pool } = require('pg');

let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

const pool = new Pool ({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm',
  port: '5432'
});
//getMaplist, getUserByUserName, getPinsByMap, updatePin, createPin, createMap,

const getMaplist = function () {
  const queryString = `SELECT * FROM maps JOIN users ON user_id = user.id WHERE user_id = $1;`;
  //const values = [user_id];

  return pool
  .query(queryString)
  .then(res => res.row[0])
  .catch(e => console.error(e.stack))
}

exports.getMaplist = getMaplist;

const getPinsByMap = function (map_id) {
  const queryString = `SELECT * FROM pin JOIN ON map_id = map.id WHERE map_id = $1;`;
  const values = [map_id];

  return pool
  .query(queryString, values)
  .then(res => res.row[0])
  .catch(e => console.error9e.stack)
}

exports.getPinsByMap = getPinsByMap;

const getMapByCenter = function (lat, long) {
  const queryString = `SELECT * FROM map JOIN pin ON pin_id = pin.id WHERE lat = $1 AND long = $2;`;
  const values = [lat, long];

  return pool
  .query(queryString, values)
  .then(res => res.row[0])
  .catch(e => console.error9e.stack)
}

exports.getMapByCenter = getMapByCenter;

const getFavouriteMaps = function (map_id, user_id) {
  const queryString = `SELECT * FROM users JOIN map ON map_id = map.id JOIN pin ON pin_id = pin.id WHERE map_id = $1 AND WHERE user_id = $2;`;
  const values = [map_id, user_id];

  return pool
  .query(queryString, values)
  .then(res => res.row[0])
  .catch(e => console.error9e.stack)
}

exports.getFavouriteMaps = getFavouriteMaps;

const createMap = function () {

  let queryString = `INSERT INTO map (user_id, title, lat, long) VALUES ($1, $2, $3, $4) `;

  let queryParams = [map.user_id, map.title, map.lat, map.long]

  console.log(queryString, queryParams);

  queryString += ` RETURNING *;`;

  return pool
  .query(queryString, queryParams)
  .then(res => res.rows)
  .catch(e => console.error(e.message))

}
exports.createMap = createMap;




module.exports = dbParams;
