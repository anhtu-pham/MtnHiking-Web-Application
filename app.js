const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const database_management = require(__dirname + "/database_management.js");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); // to use local things of /public folder (not on web)

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const status = res.statusCode;
    if(status === 200) {
        res.redirect("/success");
    }
    else {
        res.redirect("/failure");
    }
});

app.get("/failure", function(req, res) {
    res.sendFile(__dirname + "/failure.html");
});
app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.get("/success", function(req, res) {
    res.sendFile(__dirname + "/success.html");
});
app.post("/success", function(req, res) {
    res.redirect("/list");
});

app.get("/list", function(req, res) {
    const management = database_management.getInstance();
    const users = management.getAllUsers();
    users.then(function(data) {
        return res.json({data : data});
    }).catch(function(error) {
        console.log(error);
    });
});

app.listen(3000, function() {
    console.log("Server is running");
});