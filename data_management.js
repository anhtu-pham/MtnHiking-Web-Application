let mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    username: "me",
    password: "",
    database: ""
});

exports.connect = function() {
    connection.connect(function(error) {
        if(error) {
            throw error;
        }
    });
    console.log("Successful connection");
}

exports.insertIntoTable = function(table, values) {
    let sql = "INSERT INTO " + table + " VALUES ?";
    connection.query(sql, [values], function(error, result) {
        if(error) {
            console.log("Cannot add record into " + table);
            if(table === "User") {
                alert("Account cannot be created. Please try again.");
            }
        }
        console.log(result);
    });
}

exports.selectFromTable = function(table, attributeList) {
    let attributes = attributeList[0];
    for (var i = 1; i < attributeList.length; i++) {
        attributes = attributes.concat(", " + attributeList[i]);
    }
    let sql = "SELECT " + attributes + " FROM " + table;
    connection.query(sql, function(error, result) {
        if(error) {
            console.log("Cannot retrieve data from " + table);
        }
        console.log(result);
    });
}

exports.selectAllFromTable = function(table) {
    let sql = "SELECT * FROM " + table;
    connection.query(sql, function(error, result) {
        if(error) {
            console.log("Cannot retrieve entire data from " + table);
        }
        console.log(result);
    });
}