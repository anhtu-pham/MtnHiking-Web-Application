const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const sqlite3 = require("sqlite3").verbose();
const services = require(__dirname + "/database/services.js");
const crypto = require("crypto");

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

app.get("/signup", (req, res) => {
    // res.sendFile(__dirname + "/views/authentication/signup.ejs");
    res.render("signup");
});

app.post("/signup", (req, res) => {
    let instance = services.getInstance();
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let cipher = crypto.createCipheriv(algorithm, crypto.scryptSync(password, 'salt', 24), iv);
    let encryptedPassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
    db.serialize(() => {
        instance.insert(
            db, 
            "User", 
            ["username", "email", "password"], 
            ["\'" + username + "\'", "\'" + email + "\'", "\'" + encryptedPassword + "\'"]
        );
    });

    const status = res.statusCode;
    if(status === 200) {
        res.render("success");
    }
    else {
        res.render("failure");
    }
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    let user = null;
    let instance = services.getInstance();
    let username = "\'" + req.body.username + "\'";
    let password = req.body.password;
    let cipher = crypto.createCipheriv(algorithm, crypto.scryptSync(password, 'salt', 24), iv);
    let encryptedPassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
    db.serialize(() => {
        user = instance.selectConditionally(db, "User", true, null, ["username = " + username, "password = " + encryptedPassword]);
    });
    res.render(secrets);
});

app.get("/list", (req, res) => {
    let instance = services.getInstance();
});

app.listen(3000, () => {
    console.log("Server is running");
});