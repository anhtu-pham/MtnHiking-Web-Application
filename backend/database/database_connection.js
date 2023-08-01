const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(__dirname + "/the_hiking_database.db", (error) => {
    if(error) {
        console.log("Cannot connect to the database");
    }
    console.log("Successfully connected to the database");
});

module.exports = db;