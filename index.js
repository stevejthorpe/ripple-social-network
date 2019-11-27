const express = require("express");
const app = express();
const compression = require("compression"); // Compress text files gzip
const cookieSession = require("cookie-session");
const db = require("./utils/db");
const helmet = require("helmet");
const csurf = require("csurf");
const { hash, compare } = require("./utils/bc");

////////////////
// Middleware //
////////////////
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

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

// app.use(function(req, res, next) {
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

/////////////////
// Environment //
/////////////////

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
                    console.log("data in addUser: ", data);

                    req.session.userId = data.rows[0].id;

                    console.log("hash addUser userId: ", req.session.userId);

                    res.json({
                        success: true
                    });

                    // res.redirect("/");
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

app.get("/login", (req, res) => {
    console.log("in login");
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/login", (req, res) => {
    // let email = req.body.email;

    // console.log(req.body.email);
    // console.log('Body: ', req.body);

    if (req.body.password == 0 || req.body.email == 0) {
        res.redirect("/login");
    }

    return db
        .getUser(req.body.email)
        .then(data => {
            let password = req.body.password;

            let hashedPassword = data.rows[0].password;
            let userId = data.rows[0].id;

            compare(password, hashedPassword)
                .then(data => {
                    if (data === true) {
                        req.session.authenticated = true;
                        req.session.userId = userId;
                    }
                })
                .catch(err => {
                    console.log("Error in compare pw: ", err);
                });
        })
        .catch(err => {
            console.log("Error in POST /login: ", err);
        });
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
