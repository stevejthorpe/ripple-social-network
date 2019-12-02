var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

exports.addUser = function(firstname, lastname, email, bio, password) {
    console.log("In db.addUser");
    return db.query(
        "INSERT INTO users (firstname, lastname, email, bio, password) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [firstname, lastname, email, bio, password]
    );
};

exports.getUser = function(email) {
    console.log("Email inside getUser: ", email);
    return db.query(
        `SELECT *
         FROM users
         WHERE email = $1`,
        [email]
    );
};

exports.getUserProfile = function(profileId) {
    console.log("profileId in getUserProfile: ", profileId);

    return db.query(
        `SELECT *
        FROM users
        WHERE id = $1`,
        [profileId]
    );
};

exports.getUserData = function(userId) {
    console.log("In getUserData");
    return db.query(
        `SELECT *
        FROM users
        WHERE id = $1`,
        [userId]
    );
};

exports.addImageUrl = function(imageUrl, userId) {
    console.log("inside addImageUrl: ", imageUrl, userId);
    return db.query(
        `UPDATE users
        SET image = $1
        WHERE id = $2`,
        [imageUrl, userId]
    );
};

exports.addBio = function(bio, userId) {
    console.log("inside addBio: ", bio, userId);
    return db.query(
        `UPDATE users
        SET bio = $1
        WHERE id = $2
        RETURNING bio`,
        [bio, userId]
    );
};
