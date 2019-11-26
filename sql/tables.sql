DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
       id SERIAL PRIMARY KEY,
       image_id SERIAL UNIQUE,
       firstname VARCHAR(255) NOT NULL,
       lastname VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL UNIQUE,
       bio TEXT,
       password VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
