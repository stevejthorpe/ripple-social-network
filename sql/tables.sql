DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
       id SERIAL PRIMARY KEY,
       image_id SERIAL UNIQUE,
       image VARCHAR(255),
       firstname VARCHAR(255) NOT NULL CHECK (firstname != ''),
       lastname VARCHAR(255) NOT NULL CHECK (lastname != ''),
       email VARCHAR(255) NOT NULL UNIQUE CHECK (email != ''),
       bio TEXT,
       password VARCHAR(255) NOT NULL CHECK (password != ''),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS friendships CASCADE;
CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    receiver_id INT NOT NULL REFERENCES users(id),
    sender_id INT NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS chat CASCADE;
CREATE TABLE chat(
    id SERIAL PRIMARY KEY,
    receiver_id INT,
    firstname VARCHAR(255) NOT NULL CHECK (firstname != ''),
    lastname VARCHAR(255) NOT NULL CHECK (lastname != ''),
    image VARCHAR(255),
    sender_id INT NOT NULL,
    msg TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
