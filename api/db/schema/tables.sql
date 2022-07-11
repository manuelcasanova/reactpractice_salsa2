DROP TABLE IF EXISTS steps CASCADE;
DROP TABLE IF EXISTS levels CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE levels (
  levelId SERIAL PRIMARY KEY NOT NULL,
  levelTitle VARCHAR(255) NOT NULL,
  levelDescription TEXT
);

CREATE TABLE steps (
  stepId SERIAL PRIMARY KEY NOT NULL,
  stepTitle VARCHAR(255) NOT NULL,
  stepLevel_id INTEGER REFERENCES levels(levelId) ON DELETE CASCADE,
  stepPronunciation TEXT,
  stepVideo TEXT,
  stepVideoBreakdown TEXT
);

CREATE TABLE users (
  userId SERIAL PRIMARY KEY NOT NULL,
  userName VARCHAR(255) NOT NULL,
  userEmail VARCHAR(255) NOT NULL,
  userPassword VARCHAR(255) NOT NULL,
  userLevel_id INTEGER REFERENCES levels (levelId) ON DELETE CASCADE,
  userIsAdministrator BOOLEAN,
  userFavourites INTEGER REFERENCES steps (stepId) ON DELETE CASCADE
)

