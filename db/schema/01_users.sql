-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS map CASCADE;
DROP TABLE IF EXISTS favorite_maps CASCADE;
DROP TABLE IF EXISTS pin CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL);


-- CREATE TABLE map (
--   id SERIAL PRIMARY KEY NOT NULL,
--   title VARCHAR(255) NOT NULL,
--   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--   pin_id INTEGER REFERENCES pin(id) ON DELETE CASCADE,
--   latitude INTEGER NOT NULL,
--   longitude INTEGER NOT NULL);



-- CREATE TABLE favorite_maps (
--   id SERIAL PRIMARY KEY NOT NULL,
--   map_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--   map_id INTEGER REFERENCES map(id) ON DELETE CASCADE);


-- CREATE TABLE pin (
--   id SERIAL PRIMARY KEY NOT NULL,
--   title VARCHAR(255) NOT NULL,
--   pin_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--   favorite_maps_id INTEGER REFERENCES favorite_maps(id) ON DELETE CASCADE,
--   description TEXT NOT NULL,
--   latitude INTEGER NOT NULL,
--   longitude INTEGER NOT NULL,
--   active BOOLEAN NOT NULL DEFAULT TRUE);
