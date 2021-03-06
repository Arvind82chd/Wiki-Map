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
  .then(res => res.rows[0])
  .catch(e => console.error(e.stack))
}

exports.getMaplist = getMaplist;

// const getIdFromEmail = email => {
//   const queryString = `SELECT id FROM users WHERE email = $1;`;
//   const values = [email];

//   return pool
//   .query(queryString, values)
//   .then(res => res.rows[0])
//   .catch(e => console.error(e.stack))
// }

// exports.getIdFromEmail = getIdFromEmail;

const getPinsByMap = function (map_id) {
  const queryString = `SELECT * FROM pin JOIN ON map_id = map.id WHERE map_id = $1;`;
  const values = [map_id];

  return pool
  .query(queryString, values)
  .then(res => res.rows[0])
  .catch(e => console.error(e.stack))
}

exports.getPinsByMap = getPinsByMap;

const getMapByCenter = function (lat, long) {
  const queryString = `SELECT * FROM map JOIN pin ON pin_id = pin.id WHERE lat = $1 AND long = $2;`;
  const values = [lat, long];

  return pool
  .query(queryString, values)
  .then(res => res.rows[0])
  .catch(e => console.error(e.stack))
}

exports.getMapByCenter = getMapByCenter;

const getFavouriteMaps = function (map_id, user_id) {
  const queryString = `SELECT * FROM users JOIN map ON map_id = map.id JOIN pin ON pin_id = pin.id WHERE map_id = $1 AND WHERE user_id = $2;`;
  const values = [map_id, user_id];

  return pool
  .query(queryString, values)
  .then(res => res.rows[0])
  .catch(e => console.error(e.stack))
}

exports.getFavouriteMaps = getFavouriteMaps;



const createMap = function () {

  let queryString = `INSERT INTO map (user_id, title, latitude, longitude) VALUES ($1, $2, $3, $4) `;

  let queryParams = [map.user_id, map.title, map.latitude, map.longitude]

  console.log(queryString, queryParams);

  queryString += ` RETURNING *;`;

  return pool
  .query(queryString, queryParams)
  .then(res => res.rows)
  .catch(e => console.error(e.message))

}
exports.createMap = createMap;



const createPin = function () {

  let queryString = `INSERT INTO pin (title, pin_user_id,
    favorite_maps_id, description, latitude, longitude, active) VALUES ($1, $2, $3, $4, ) `;

  let queryParams = [pin.title, pin.pin_user_id, pin.favorite_maps_id, pin.description, pin.latitude, pin.longitude, pin.active]

  console.log(queryString, queryParams);

  queryString += ` RETURNING *;`;

  return pool
  .query(queryString, queryParams)
  .then(res => res.rows)
  .catch(e => console.error(e.message))

}
exports.createPin = createPin;



const editPin = function (pin_id) {

  let queryString = `UPDATE pin
  SET title = $1, description = $4, image_url = $3, pin_user_id = $2, favorite_maps_id = $3,  latitude = $5, longitute = $6, active = $7
  WHERE pin_id = ${pin_id};`;

  let queryParams = []

  if (pin.title) {
    queryParams.push(`%${pin.title}`);
    queryString += `SET title = $${pin.title}`;
  }

  else if (pin.description) {
    queryParams.push(`%${pin.description}`);
    queryString += `SET title = $${pin.description}`;
  }

  else if (pin.image_url) {
    queryParams.push(`%${pin.image_url}`);
    queryString += `SET title = $${pin.image_url};`;
  }

  console.log(queryString, queryParams);

  return pool
  .query(queryString, queryParams)
  .then(res => res.rows)
  .catch(e => console.error(e.message))

}
exports.editPin = editPin;

module.exports = dbParams;
