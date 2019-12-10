const express = require("express");
const app = express();
const compression = require("compression"); // Compress text files gzip
// const cookieSession = require("cookie-session");
const db = require("./utils/db");
const helmet = require("helmet");
const csurf = require("csurf");
const { hash, compare } = require("./utils/bc");
const { uploader } = require("./multer");
const s3 = require("./s3");
const { s3Url } = require("./config.json");
// Socket.io
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

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

// COOKIE SESSION //
const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

// SECURITY //
app.use(helmet());

app.use(csurf());

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
            console.log(
                "hashedPassword.rows[0].id: ",
                hashedPassword.rows[0].id
            );

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

app.get("/login", (req, res) => {
    console.log("GET login route");
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// LOGOUT //
app.get("/logout", (req, res) => {
    console.log("Logging out");
    req.session.userId = null;
    res.redirect("/welcome#/login");
});

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

// USER PROFILE | OTHER USERS //
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

// USER SEARCH //
app.get("/users/:search", (req, res) => {
    console.log("GET/findpeople");
    console.log("GET/findpeople params: ", req.params.search);
    return db
        .getUserSearch(req.params.search)
        .then(({ rows }) => {
            console.log("GET/findpeople rows: ", rows);
            res.json(rows);
        })
        .catch(err => {
            console.log("Error GET/findpeople: ", err);
        });
});

app.get("/api/users", (req, res) => {
    console.log("IN GET USERS");
    return db
        .getNewUsers()
        .then(({ rows }) => {
            console.log("GET USERS ROWS: ", rows);
            res.json(rows);
        })
        .catch(err => {
            console.log("Error in GET/users | getNewUsers: ", err);
        });
});

// FRIENDSHIP //
app.post("/send-friend-request/:recieverId", (req, res) => {
    return db
        .addFriendRequest(req.params.recieverId, req.session.userId)
        .then(resp => {
            console.log("POST/friendshipstatus resp: ", resp);
            res.json({
                buttontext: "Cancel friend request"
            });
        })
        .catch(err => {
            console.log("Error in POST/friendshipstatus: ", err);
        });
});

app.get("/friends-wannabes", (req, res) => {
    console.log("In GET/friends-wannabes");
    return db
        .getWannabes(req.session.userId)
        .then(resp => {
            console.log("GET/friends-wannabes resp: ", resp.rows);
            res.json({
                friendsWannabes: resp
            });
        })
        .catch(err => {
            console.log("Error in GET/friends-wannabes: ", err);
        });
});

app.post("/accept-friend-request/:recieverId", (req, res) => {
    return db
        .addAcceptFriend(req.params.recieverId, req.session.userId)
        .then(resp => {
            console.log("POSTaccept-friend-request/ resp: ", resp);
            res.json({
                buttontext: "Unfriend"
            });
        })
        .catch(err => {
            console.log("Error in POST/accept-friend-request/: ", err);
        });
});

app.post("/end-friendship/:recieverId", (req, res) => {
    return db
        .addEndFriend(req.params.recieverId, req.session.userId)
        .then(resp => {
            console.log("POST/end-friendship/ resp: ", resp);
            res.json({
                buttontext: "Make friend request"
            });
        })
        .catch(err => {
            console.log("Error in POST/end-friendship/: ", err);
        });
});

app.get("/friendshipstatus/:recieverId", (req, res) => {
    return db
        .getFriendship(req.params.recieverId, req.session.userId)
        .then(({ rows }) => {
            console.log("rows: ", rows[0].accepted);
            console.log("resp object: ", rows[0]);

            // res.json(rows);
            if (rows[0].accepted == true) {
                res.json({
                    buttontext: "Unfriend"
                });
            }
            if (rows[0].accepted == false) {
                if (rows[0].sender_id === req.session.userId) {
                    res.json({
                        buttontext: "Cancel friend request"
                    });
                } else {
                    res.json({
                        buttontext: "Accept friend request"
                    });
                }
            }
        })
        .catch(err => {
            console.log("Error in GET/friendshipstatus: ", err);
        });
});

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
// app.get("*", function(req, res) {
//     console.log("GET * route");
//     if (!req.session.userId) {
//         res.redirect("/welcome");
//     } else {
//         res.sendFile(__dirname + "/index.html");
//     }
// });

app.get("*", function(req, res) {
    if (req.session.userId) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/welcome");
    }
});

////////////
// Server //
////////////

// app.listen(8080, function() {
//     console.log("I'm listening.");
// });

server.listen(8080, function() {
    console.log("I'm listening.");
});

// io.on("connection", socket => {
//     console.log(`Socket with the id ${socket.id} just connected`);
//
//     socket.on("disconnect", () => {
//         console.log(`Socket with the id ${socket.id} just disconnected`);
//     });
// });

///////////////////////////////
// SERVER SIDE FOR SOCKET IO //
///////////////////////////////

io.on("connection", async socket => {
    console.log(`Socket with the id ${socket.id} just connected`);
    if (!socket.request.session.userId) {
        // If not logged in, disconnect.
        return socket.disconnect(true);
    }
    let userId = socket.request.session.userId;

    // Chat message stuff
    // Make db query for last 10 chat chatMessages

    socket.on("chat message", msg => {
        console.log("msg on the server: ", msg);
        console.log("userId: ", userId);
        console.log("socket.request.session: ", socket.request.session);
        // io.sockets.emit("send message object", msg);

        // Look up info about user (firstname, lastname, image)
        // Then add it to db.
        // Then emit to everyone...

        Promise.all([db.getChats(), db.addChat(userId, msg)])
            .then(data => {
                console.log("Chat list: ", data[0].rows);
                // io.sockets.emit("chatMessages", data.rows[0].reverse());
                io.sockets.emit("chatMessages", data[0].rows.reverse());

                // console.log("addChat: ", data[1].rows);
                // io.sockets.emit("chatMessages", data[0].rows.reverse());
                // console.log("data[0].rows.reverse(): ", data[0].rows.reverse());
                // console.log("User data: ", data[1].rows);
            })
            .catch(err => {
                console.log("error", err);
            });
    });
});
