var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

exports.addUser = function(
    image_id,
    firstname,
    lastname,
    email,
    bio,
    password
) {
    console.log("In db.addUser");
    return db.query(
        "INSERT INTO users (image_id, firstname, lastname, email, bio, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [image_id, firstname, lastname, email, bio, password]
    );
};
