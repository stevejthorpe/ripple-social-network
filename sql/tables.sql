-- DROP TABLE IF EXISTS users CASCADE;
-- CREATE TABLE users(
--        id SERIAL PRIMARY KEY,
--        image_id SERIAL UNIQUE,
--        firstname VARCHAR(255) NOT NULL CHECK (firstname != ''),
--        lastname VARCHAR(255) NOT NULL CHECK (lastname != ''),
--        email VARCHAR(255) NOT NULL UNIQUE CHECK (email != ''),
--        bio TEXT,
--        password VARCHAR(255) NOT NULL CHECK (password != ''),
--        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    receiver_id INT NOT NULL REFERENCES users(id),
    sender_id INT NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT FALSE
);
