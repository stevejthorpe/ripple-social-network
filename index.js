const express = require("express");
const app = express();
const compression = require("compression"); // Compress text files gzip
const cookieSession = require("cookie-session");
const db = require("./utils/db");
const helmet = require("helmet");
const csurf = require("csurf");
const { hash, compare } = require("./utils/bc");
const { uploader } = require("./multer");
const s3 = require("./s3");
const { s3Url } = require("./config.json");

////////////////
// Middleware //
////////////////
app.use(compression());
app.use(express.json());
app.use(express.static("./public"));
app.use(express.static("./assets"));
app.use(express.static("./utils"));
app.use(express.static("./secrets"));

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
    console.log("GET welcome route");
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// REGISTER //

// app.post("/register", async (req, res) => {
//     const { firstname, lastname, email, bio, password } = req.body;
//     try {
//         let hashedPassword = await hash(password);
//         let id = await db.addUser(
//             firstname,
//             lastname,
//             email,
//             bio,
//             hashedPassword
//         );
//         req.session.userId = id;
//
//         res.json({
//             success: true
//         });
//     } catch (err) {
//         console.log("Error in POST /register: ", err);
//         res.json({
//             success: false,
//             error: true
//         });
//     }
// });

app.post("/register", (req, res) => {
    console.log("POST register route");
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

// LOGIN //
app.get("/login", (req, res) => {
    console.log("GET login route");
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/login", async (req, res) => {
    console.log("POST login route");
    const { email, password } = req.body;

    try {
        const hashedPassword = await db.getUser(email);
        const correctPassword = await compare(
            password,
            hashedPassword.rows[0].password
        );

        if (correctPassword) {
            console.log("Passwords match");
            req.session.userId = hashedPassword.rows[0].id;
            console.log("req.session.userId: ", req.session.userId);
            res.json({
                success: true
            });
        } else {
            res.json({
                success: false
            });
        }
    } catch (err) {
        console.log("Error POST/login route | compare", err);
        res.json({
            success: false
        });
    }
});

// app.post("/login", (req, res) => {
//     // let email = req.body.email;
//
//     // console.log(req.body.email);
//     // console.log('Body: ', req.body);
//
//     if (req.body.password == 0 || req.body.email == 0) {
//         res.redirect("/login");
//     }
//
//     return db
//         .getUser(req.body.email)
//         .then(data => {
//             let password = req.body.password;
//
//             let hashedPassword = data.rows[0].password;
//             let userId = data.rows[0].id;
//
//             compare(password, hashedPassword)
//                 .then(data => {
//                     if (data === true) {
//                         console.log("PW Match");
//                         req.session.authenticated = true;
//                         req.session.userId = userId;
//                         res.json({
//                             success: true
//                         });
//                     } else {
//                         console.log("PW No Match");
//                         res.json({
//                             success: false
//                         });
//                     }
//                 })
//                 .catch(err => {
//                     console.log("Error in compare pw: ", err);
//                     res.json({
//                         success: false
//                     });
//                 });
//         })
//         .catch(err => {
//             console.log("Error in POST /login: ", err);
//             res.json({
//                 success: false
//             });
//         });
// });

// USER //
app.get("/user.json", (req, res) => {
    console.log("POST/user route");
    return db
        .getUserData(req.session.userId)
        .then(data => {
            console.log("POST /users data: ", data.rows);
            res.json(data.rows[0]);
        })
        .catch(err => {
            console.log("Error in POST / user: ", err);
        });
});

// USER PROFILE //
app.get("/api/user/:id", (req, res) => {
    console.log("GET/user/:id route");
    console.log("req.params.id: ", req.params.id);
    return db
        .getUserProfile(req.params.id)
        .then(({ rows }) => {
            console.log("POST /user/:id data: ", rows);
            res.json({ user: rows[0], id: req.session.userId });
        })
        .catch(err => {
            console.log("Error in POST / user: ", err);
        });
});

// app.get("/user/:id", (req, res) => {
//     console.log("GET/userprofile");
//     console.log("GET/userprofile req.body: ", req.body);
//     console.log("req.params.id: ", req.params.id);
//     return db
//         .getUserProfile()
//         .then(data => {
//             console.log("GET | getUserProfile data: ", data.rows[0]);
//             res.json(data.rows[0]);
//         })
//         .catch(err => {
//             console.log("Error | getUserProfile: ", err);
//         });
// });

// IMAGE UPLOAD //
app.post("/upload", uploader.single("file"), s3.upload, async (req, res) => {
    console.log("/upload route");
    console.log("input....", req.body);
    const imageUrl = s3Url + req.file.filename;
    console.log("imgUrl: ", imageUrl);

    try {
        await db.addImageUrl(imageUrl, req.session.userId);
        console.log("imageUrl in try: ", imageUrl);
        res.json({
            imageUrl: imageUrl
        });
    } catch (err) {
        console.log("err in addImageUrl: ", err);
    }
});

// UPDATE BIO //
app.post("/updatebio", (req, res) => {
    console.log("POST /updatebio route: ", req.body);
    console.log("POST /updatebio bio: ", req.body.bio);
    console.log("POST /updatebio userId: ", req.session.userId);

    return db
        .addBio(req.body.bio, req.session.userId)
        .then(data => {
            console.log("Added bio: ", data);
            res.json({
                success: true
            });
        })
        .catch(err => {
            console.log("err in addBio: ", err);
        });
});

// DEFAULT //
app.get("*", function(req, res) {
    console.log("GET * route");
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// LOGOUT //
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
