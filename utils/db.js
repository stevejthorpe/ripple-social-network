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

exports.getNewUsers = function() {
    return db.query(
        `SELECT *
        FROM users
        ORDER BY id
        LIMIT 3
        `
    );
};

exports.getUserSearch = function(search) {
    console.log("in getUserSearch");
    return db.query(
        `SELECT *
        FROM users
        WHERE firstname ILIKE  $1
        LIMIT 3`,
        [search + "%"]
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
exports.addFriendRequest = function(recieverId, senderId) {
    console.log("inside addFriendRequest: ", recieverId, senderId);
    return db.query(
        `INSERT INTO friendships (receiver_id, sender_id)
        VALUES ($1, $2)`,
        [recieverId, senderId]
    );
};

exports.addAcceptFriend = function(recieverId, senderId) {
    console.log("inside addAcceptFriend: ", recieverId, senderId);
    return db.query(
        `UPDATE friendships
        SET accepted = true
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)`,
        [recieverId, senderId]
    );
};

exports.addEndFriend = function(recieverId, senderId) {
    console.log("inside addEndFriend: ", recieverId, senderId);
    return db.query(
        `DELETE FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)`,
        [recieverId, senderId]
    );
};

exports.getFriendship = function(recieverId, senderId) {
    console.log("inside getFriendship: ", recieverId, senderId);
    return db.query(
        `SELECT * FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)`,
        [recieverId, senderId]
    );
};

exports.getWannabes = function(userId) {
    console.log("In db.getWannabes: ");
    return db.query(
        `SELECT users.id, firstname, lastname, image, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)`,
        [userId]
    );
};
