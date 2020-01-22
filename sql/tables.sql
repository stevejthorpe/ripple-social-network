DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    image character varying(255),
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    email character varying(255) NOT NULL UNIQUE,
    bio text,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS friendships CASCADE;
CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    receiver_id integer NOT NULL REFERENCES users(id),
    sender_id integer NOT NULL REFERENCES users(id),
    accepted boolean DEFAULT false
);

DROP TABLE IF EXISTS chat CASCADE;
CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    receiver_id integer,
    sender_id integer NOT NULL,
    msg text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    firstname character varying(255),
    lastname character varying(255),
    image character varying(255)
);
