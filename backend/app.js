//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const sqlite3 = require("sqlite3").verbose();
const ct = require("crypto");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cors = require("cors");
// const services = require(__dirname + "/database/services.js");

const mountains = require(__dirname + "/functionalities/mountains.js");
const trails = require(__dirname + "/functionalities/trails.js");
const users = require(__dirname + "/functionalities/users.js");
const trips = require(__dirname + "/functionalities/trips.js");

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

// let formattedCurrentTime = null;

const app = express();
app.set('view engine', 'ejs');
app.use(cors());
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
    // let instance = services.getInstance();
    let cipher = ct.createCipheriv(algorithm, ct.scryptSync(password, 'salt', 24), iv);
    let encryptedPassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
    // instance.select(db, ["User"], null, ["username = \'" + username + "\'", "password = \'" + encryptedPassword + "\'"], null)
    users.findUser(username, encryptedPassword)
    .then(response => {
        if(response.length == 1) {
            return cb(null, response);
        }
        else {
            return cb(null, false, {message: "Incorrect username or incorrect password!"});
        }
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
    // res.render("home");
});

app.route("/signup")
    // .get((req, res) => {
    //     res.render("signup", {err: ""});
    // })
    .post((req, res) => {
        // let instance = services.getInstance();
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let cipher = ct.createCipheriv(algorithm, ct.scryptSync(password, 'salt', 24), iv);
        let encryptedPassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
        // instance.insert(db, "User", ["username", "email", "password"], ["\'" + username + "\'", "\'" + email + "\'", "\'" + encryptedPassword + "\'"])
        users.addUser(username, email, encryptedPassword)
        .then(() => {
            let user = {
                username: username
            };
            req.login(user, (error) => {
                if(error) {
                    // res.render("signup", {err: "An error occurred. Please try again."});
                    // res.redirect("/signup");
                    throw(error);
                }
                else {
                    res.redirect("/main");
                }
            });
        })
        .catch((error) => {
            // res.render("signup", {err: "Username was taken. Please try another username."});
            res.redirect("/signup");
        });
    });

// app.post("/failure", (req, res) => {
//     res.render("signup");
// });

app.route("/login")
    .get((req, res) => {
        // res.render("login", {err: ""});
    })
    .post((req, res) => {
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

app.route("/main")
    .get((req, res) => {
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

app.route("/profile/trips")
    .get((req, res) => {
        if(req.isAuthenticated()){
            let username = req.user.username;
            let currentTime = new Date().toISOString();
            let formattedCurrentTime = currentTime.substring(0, currentTime.indexOf(".")).replace('T', ' ');
            
            // let instance = services.getInstance();
            // let pastTripList = [];
            // let nextTripList = [];
            // instance
            // .select(db, ["User", "Trail_trip", "Trail"], ["Trail_trip.trip_ID", "Trail.trail_name", "Trail_trip.starting_time", "Trail_trip.ending_time", "Trail_trip.ratings"], ["User.username = Trail_trip.username", "Trail_trip.trail_ID = Trail.trail_ID", "User.username = \'" + username + "\'"], "Trail_trip.starting_time DESC")
            // .then((response) => {
            //     pastTripList = response;
            //     let i = 0;
            //     while(response[i]["Trail_trip.ending_time"] > formattedCurrentTime) {
            //         let trip = pastTripList.shift();
            //         nextTripList.push(trip);
            //         i++;
            //     }
            //     // res.json({trips: response});
            //     res.json({pastTripList: pastTripList, nextTripList: nextTripList});
            // })
            trips.getTrips(username, formattedCurrentTime)
            .then((response) => {
                res.json({pastTrips: response.pastTrips, nextTrips: response.nextTrips})
            })
            .catch((error) => {
                console.log("Cannot retrieve trail trips");
            });
        }
        else {
            res.redirect("/login");
        }
    })
    .post((req, res) => {
        if(req.isAuthenticated()) {

            let username = req.user.username;
            let trailID = req.body.trailID;
            let startingTime = req.body.startingTime;
            let endingTime = req.body.endingTime;

            // let instance = services.getInstance();
            // instance.insert(db, "Trail_trip", ["username", "trail_ID", "starting_time", "ending_time"], ["\'" + username + "\'", trailID, "\'" + startingTime + "\'", "\'" + endingTime + "\'"])
            trips.addTrip(username, trailID, startingTime, endingTime)
            .catch(error => {
                console.log("Cannot insert trail trip");
            });
        }
        else {
            res.redirect("/login");
        }
    });

app.route("/profile/trips/:tripID")
    .patch((req, res) => {
        if(req.isAuthenticated()) {
            let instance = services.getInstance();

            let username = req.user.username;
            let tripID = req.params.tripID;
            let ratings = req.body.ratings;
            instance
            .update(db,
                    "Trail_trip",
                    ["ratings = " + ratings],
                    ["trip_ID = " + tripID,
                    "username = \'" + username + "\'"])
            .then(() => {
            })
            .catch(error => {
                console.log("Cannot update ratings");
            })
        }
        else {
            res.redirect("/login");
        }
    })
    .delete((req, res) => {
        if(req.isAuthenticated()) {
            let username = req.user.username;
            let tripID = req.params.tripID;

            // let instance = services.getInstance();
            // instance
            // .delete(db,
            //         "Trail_trip",
            //         ["trip_ID = " + tripID,
            //         "username = \'" + username + "\'"])
            trips.removeTrip(username, tripID)
            .catch((error) => {
                console.log("Cannot remove trip");
            })
        }
        else {
            res.redirect("/login");
        }
    });

app.route("/signout")
    .get((req, res) => {
        app.render("signout");
    })
    .post((req, res) => {
        req.logout();
        req.redirect("/");
    });

app.listen(5000, () => {
    console.log("Server is running");
});