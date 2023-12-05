//jshint esversion:6
let express = require("express");
let bodyParser = require("body-parser");
let ejs = require("ejs");
let sqlite3 = require("sqlite3").verbose();
let ct = require("crypto");
let session = require("express-session");
let passport = require("passport");
let LocalStrategy = require("passport-local");
let cors = require("cors");
const { emitWarning } = require("process");
// let ensureLogIn = require("connect-ensure-login").ensureLoggedIn;
// const services = require(__dirname + "/database/services.js");

let mountainFunctions = require(__dirname + "/functionalities/mountains.js");
let trailFunctions = require(__dirname + "/functionalities/trails.js");
let userFunctions = require(__dirname + "/functionalities/users.js");
let tripFunctions = require(__dirname + "/functionalities/trips.js");

let SQLiteStore = require("connect-sqlite3")(session);

let db = new sqlite3.Database(__dirname + "/database/mountain_hiking_database.db", (error) => {
    if(error) {
        console.log(error.message);
        console.log("Cannot connect");
    }
    console.log("Successfully connected to the database");
});

// let ensureLoggedIn = ensureLogIn();

const algorithm = 'aes192';
const iv = Buffer.alloc(16, 0);

// let formattedCurrentTime = null;

const app = express();
// proxyMiddleware(app);
app.set('view engine', 'ejs');
app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
// app.use(express.static("public")); // to use local things of /public folder (not on web)

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: "mountain_hiking_database.db", dir: __dirname + "/database"})
}));
app.use(passport.authenticate("session"));
passport.use(new LocalStrategy(function verify(username, password, cb) {
    let cipher = ct.createCipheriv(algorithm, ct.scryptSync("\'" + password + "\'", 'salt', 24), iv);
    let encryptedPassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
    userFunctions.findUser(username, encryptedPassword)
    .then(response => {
        if(response.length == 1) {
            return cb(null, response);
        }
        else {
            return cb(null, false, {message: "Incorrect username or password!"});
        }
    })
    .catch((error) => {
        return cb(error);
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




let examineAuthentication = (req, res, next) => {
    return next();
    // if (req.isAuthenticated()) {
    //     return next();
    // } else {
    //     res.status(401).json({message: "Unauthorized access"});
    // }
}

app.get("/", (req, res) => {
    // res.render("home");
});

app.route("/signup")
    // .get((req, res) => {
    //     res.render("signup", {err: ""});
    // })
    .post((req, res) => {
        console.log("POST RECEIVED");
        let username = req.body.username;
        let email = req.body.email;
        let initialPassword = req.body.password;
        let cipher = ct.createCipheriv(algorithm, ct.scryptSync("\'" + initialPassword + "\'", 'salt', 24), iv);
        let encryptedPassword = cipher.update(initialPassword, 'utf8', 'hex') + cipher.final('hex');
        userFunctions.addUser(username, email, encryptedPassword)
        .then(() => {
            let user = {
                username: username
            };
            req.login(user, (error) => {
                if(error) {
                    console.log(error);
                    res.json({username: "", message: "An error occurred. Please try again."});
                }
                else {
                    res.json({username: username, message: ""});
                }
            });
        })
        .catch((error) => {
            console.log(error);
            res.json({username: "", message: "Username was taken. Please try another username."});
        });
    });

app.route("/login")
    .get((req, res) => {
    })
    .post((req, res) => {
        passport.authenticate("local", (error, user) => {
            if(error) {
                console.log(error);
                res.json({username: "", message: "An error occured. Please try again."});
            }
            else if(!user) {
                res.json({username: "", message: "Username or password is incorrect."});
            }
            else {
                let authenticatedUser = user[0];
                res.json({username: authenticatedUser.username, message: ""});
            }
        })(req, res);
    });

// app.route("/main")
//     .get((req, res) => {
//         if(req.isAuthenticated()){
//         }
//         else {
//             res.redirect("/login");
//         }
//     })
//     .post((req, res) => {
//         if(req.isAuthenticated()){
//         }
//         else {
//             res.redirect("/login");
//         }
//     });

app.route("/mountains")
    .get(examineAuthentication, (req, res) => {
        console.log("GET MOUNTAINS RECEIVED");
            console.log("AUTHENTICATED");
            mountainFunctions.getHighlyRatedMountains()
            .then((response) => {
                res.json({mountains: response});
            })
            .catch((error) => {
                console.log("Cannot retrieve mountains");
            });
        console.log("END OF METHOD");
    });

app.route("/mountains/:name")
    .get(examineAuthentication, (req, res) => {
        console.log("REACHED TRAILS");
        trailFunctions.getAssociatedTrails(req.params.name, null)
        .then((response) => {
            res.json({trails: response});
        })
        .catch((error) => {
            console.log("Cannot retrieve associated trails");
        })
    })


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
            tripFunctions.getTrips(username, formattedCurrentTime)
            .then((response) => {
                res.json({pastTrips: response.pastTrips, nextTrips: response.nextTrips});
            })
            .catch((error) => {
                console.log("Cannot retrieve trail trips");
            });
        } else {
            res.redirect("/login");
        }
    })
    .post((req, res) => {
        if(req.isAuthenticated()) {

            let username = req.user.username;
            let trailID = req.body.trailID;
            let startingTime = req.body.startingTime;
            let endingTime = req.body.endingTime;

            tripFunctions.addTrip(username, trailID, startingTime, endingTime);
        } else {
            res.redirect("/login");
        }
    });

app.route("/profile/trips/:tripID")
    .patch((req, res) => {
        if(req.isAuthenticated()) {
            let username = req.user.username;
            let tripID = req.params.tripID;
            let ratings = req.body.ratings;
            tripFunctions.updateTrip(username, tripID, ratings);
        } else {
            res.redirect("/login");
        }
    })
    .delete((req, res) => {
        if(req.isAuthenticated()) {
            let username = req.user.username;
            let tripID = req.params.tripID;
            tripFunctions.removeTrip(username, tripID);
        } else {
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