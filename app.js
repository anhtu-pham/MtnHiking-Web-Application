const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const sqlite3 = require("sqlite3").verbose();
const services = require(__dirname + "/database/services.js");

let db = new sqlite3.Database(__dirname + "/database/mountain_hiking_database.db", (error) => {
    if(error) {
        console.log(error.message);
        console.log("Cannot connect");
    }
    console.log("Successfully connected to the database");
});

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); // to use local things of /public folder (not on web)

app.get("/signup", (req, res) => {
    // res.sendFile(__dirname + "/views/authentication/signup.ejs");
    res.render("signup");
});

app.post("/signup", (req, res) => {
    const instance = services.getInstance();
    const data = req.body;
    db.serialize(() => {
        instance.insert(
            db, 
            "User", 
            ["first_name", "last_name", "email", "code"], 
            ["\'" + data.first_name + "\'", "\'" + data.last_name + "\'", "\'" + data.email + "\'", "\'" + data.password + "\'"]
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



app.get("/list", (req, res) => {
    const instance = services.getInstance();
});

app.get("/add", (req, res) => {
    const instance = services.getInstance();
});

app.listen(3000, () => {
    console.log("Server is running");
});