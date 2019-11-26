const express = require("express");
const app = express();
const compression = require("compression"); // Compress text files gzip
const cookieSession = require("cookie-session");
const db = require("./utils/db");
const helmet = require("helmet");
// const csurf = require("csurf");
const { hash, compare } = require("./utils/bc");

///////////////
// Middlewar //
///////////////
app.use(compression());
app.use(express.json());
app.use(express.static("./public"));
app.use(express.static("./assets"));
app.use(express.static("./utils"));

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(
    cookieSession({
        secret: "I'm always angry.",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(helmet());

// app.use(csurf());

// app.use(function(req, res, next) {
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

////////////
// Routes //
////////////

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    hash(req.body.password)
        .then(hashedPassword => {
            console.log("hashed pw: ", hashedPassword);

            return db
                .addUser(
                    req.body.firstname,
                    req.body.lastname,
                    req.body.email,
                    req.body.bio,
                    hashedPassword
                )
                .then(data => {
                    console.log("POST /register success!!");
                    console.log("POST /register data: ", data.rows);

                    req.session.userId = data.rows[0].id;

                    console.log("hash addUser userId: ", req.session.userId);

                    res.json({
                        success: true
                    });

                    // res.redirect('/profile');
                })
                .catch(err => {
                    console.log("Error in POST /register: ", err);
                    res.json({
                        success: false
                    });
                });
        })
        .catch(err => {
            console.log("Error in hash pw: ", err);
        });
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
