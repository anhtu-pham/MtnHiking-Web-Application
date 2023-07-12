//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const sqlite3 = require("sqlite3").verbose();
const crypto = require("crypto");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const services = require(__dirname + "/database/services.js");

let SQLiteStore = require("connect-sqlite3")(session);

let db = new sqlite3.Database(__dirname + "/database/mountain_hiking_database.db", (error) => {
    if(error) {
        console.log(error.message);
        console.log("Cannot connect");
    }
    console.log("Successfully connected to the database");
});

const algorithm = 'aes192';
const iv = Buffer.alloc(16, 0);

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); // to use local things of /public folder (not on web)

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: "mountain_hiking_database.db", dir: __dirname + "/database"})
}));
app.use(passport.authenticate("session"));

passport.use(new LocalStrategy(function verify(username, password, cb) {
    let instance = services.getInstance();
    let cipher = crypto.createCipheriv(algorithm, crypto.scryptSync(password, 'salt', 24), iv);
    let encryptedPassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
    instance.selectConditionally(db, "User", true, null, ["username = \'" + username + "\'", "password = \'" + encryptedPassword + "\'"])
    .then(response => {
        if(response.length == 1) {
            return cb(null, response);
        }
        else {
            return cb(null, false, {message: "Incorrect username or incorrect password!"});
        }
        // if(response.length == 1) {
        //     res.render("secrets");
        // }
    })
    .catch((error) => {
        return cb(error);
        // res.render("login");
    });
}));
passport.serializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, {username: user.username});
    });
});
passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
        return cb(null, user);
    });
});

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/signup", (req, res) => {
    res.render("signup", {err: ""});
});

app.post("/signup", (req, res) => {
    let instance = services.getInstance();
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let cipher = crypto.createCipheriv(algorithm, crypto.scryptSync(password, 'salt', 24), iv);
    let encryptedPassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
    instance.insert(
        db, 
        "User", 
        ["username", "email", "password"], 
        ["\'" + username + "\'", "\'" + email + "\'", "\'" + encryptedPassword + "\'"]
    )
    .then(() => {
        let user = {
            username: username
        };
        req.login(user, (error) => {
            if(error) {
                res.render("signup", {err: "An error occurred. Please try again."});
            }
            else {
                res.redirect("/secrets");
            }
        });
    })
    .catch((error) => {
        res.render("signup", {err: "Username was taken. Please try another username."});
    });
});

app.post("/failure", (req, res) => {
    res.render("signup");
});

app.get("/login", (req, res) => {
    res.render("login", {err: ""});
});

// app.post("/login", (req, res) => {
//     let instance = services.getInstance();
//     let username = req.body.username;
//     let password = req.body.password;
//     let cipher = crypto.createCipheriv(algorithm, crypto.scryptSync(password, 'salt', 24), iv);
//     let encryptedPassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
//     instance.selectConditionally(db, "User", true, null, ["username = \'" + username + "\'", "password = \'" + encryptedPassword + "\'"])
//     .then(response => {
//         if(response.length == 1) {
//             res.render("secrets");
//         }
//     })
//     .catch((error) => {
//         res.render("login");
//     });
// });

app.post("/login", (req, res) => {
    passport.authenticate("local", (error, user) => {
        if(error) {
            res.render("login", {err: "An error occurred. Please try again."});
        }
        else if(!user) {
            res.render("login", {err: "Please recheck the information and try again."});
        }
        else {
            res.redirect("/main");
        }
        // successReturnToOrRedirect: "/main",
        // failureRedirect: "/login"
    })(req, res);
});

app.get("/main", (req, res) => {
    if(req.isAuthenticated()){
        res.render("main");
    }
    else {
        res.redirect("/login");
    }
});

app.get("/logout", (req, res) => {
    req.logout();
    req.redirect("/");
});

app.listen(3000, () => {
    console.log("Server is running");
});