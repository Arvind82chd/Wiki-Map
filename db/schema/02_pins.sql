DROP TABLE IF EXISTS pin CASCADE;

CREATE TABLE pin (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  pin_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  favorite_maps_id INTEGER REFERENCES favorite_maps(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  latitude INTEGER NOT NULL,
  longitude INTEGER NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE);
