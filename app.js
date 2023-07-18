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

let formattedCurrentTime = null;

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
    instance.select(db, ["User"], null, ["username = \'" + username + "\'", "password = \'" + encryptedPassword + "\'"], null)
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
                res.redirect("/main");
            }
        });
    })
    .catch((error) => {
        res.render("signup", {err: "Username was taken. Please try another username."});
    });
});

// app.post("/failure", (req, res) => {
//     res.render("signup");
// });

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
            res.render("login", {err: "Username or password is incorrect. Please try again."});
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
    }
    else {
        res.redirect("/login");
    }
});

app.get("/mountain", (req, res) => {
    if(req.isAuthenticated()){
    }
    else {
        res.redirect("/login");
    }
});

app.get("/profile/trips", (req, res) => {
    if(req.isAuthenticated()){
        let username = req.user.username;
        let instance = services.getInstance();
        let pastTripList = [];
        let nextTripList = [];
        currentTime = new Date().toISOString();
        formattedCurrentTime = currentTime.substring(0, currentTime.indexOf(".")).replace('T', ' ');
        instance
        .select(db, 
                ["User", "Trail_trip", "Trail"], 
                ["Trail.trail_name", "Trail_trip.starting_time", "Trail_trip.ending_time"], 
                ["User.username = Trail_trip.username",
                 "Trail_trip.trail_ID = Trail.trail_ID",
                 "User.username = \'" + username + "\'"],
                 "Trail_trip.starting_time DESC")
        .then((response) => {
            pastTripList = response;
            let i = 0;
            let tripTime = "\'" + response[i]["Trail_trip.starting_time"] + "\'";
            while(tripTime >= formattedCurrentTime) {
                let trip = pastTripList.shift();
                nextTripList.push(trip);
                tripTime = "\'" + response[++i]["Trail_trip.starting_time"] + "\'";
            }

            // for (let i = 0; i < response.length; i++) {
            //     let tripTime = "\'" + response[i]["Trail_trip.ending_time"] + "\'";
            //     let formattedTripTime = tripTime.replace(' ', 'T');
            //     if(formattedTripTime < currentTime) {
            //         pastTripList.push(response[i]);
            //     }
            //     else {
            //         nextTripList.push(response[i]);
            //     }
            // }

            res.json({username: username, pastTripList: pastTripList, nextTripList: nextTripList});
        })
        .catch((error) => {
            console.log("Cannot retrieve trail trips");
        });
    }
    else {
        res.redirect("/login");
    }
});

app.post("/profile/trips/ratings", (req, res) => {
    if(req.isAuthenticated()) {
        let username = req.user.username;
        let instance = services.getInstance();
        let trailID = req.body.trailID;
        let startingTime = req.body.startingTime;
        let endingTime = req.body.endingTime;
        instance
        .insert(db,
                "Trail_trip",
                ["username", "trail_ID", "starting_time", "ending_time"],
                ["\'" + username + "\'", trailID, "\'" + startingTime + "\'", "\'" + endingTime + "\'"])
        .then(() => {
        })
        .catch(error => {
            console.log("Cannot insert trail trip");
        })
    }
    else {
        res.redirect("/login");
    }

});

app.post("/profile/trail", (req, res) => {
    if(req.isAuthenticated()) {
        let username = req.user.username;
        let trailID = req.body.trailID;
        let startingTime = req.body.startingTime;
        let ratings = req.body.ratings;
        let instance = services.getInstance();
        instance
        .update(db,
                "Trail_trip",
                ["ratings = " + ratings],
                ["username = \'" + username + "\'",
                 "trail_ID = " + trailID,
                 "starting_time = \'" + startingTime + "\'",
                 "starting_time <= \'" + formattedCurrentTime + "\'"])
        .then(() => {
        })
        .catch(error => {
            console.log("Cannot update ratings");
        })
    }
    else {
        res.redirect("/login");
    }
});

app.get("/signout", (req, res) => {
    app.render("signout");
});

app.post("/signout", (req, res) => {
    req.logout();
    req.redirect("/");
});

app.listen(3000, () => {
    console.log("Server is running");
});