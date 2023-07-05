let mysql = require("mysql2");
let dotenv = require("dotenv");
let instance = null;
dotenv.config();

let pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
});

// pool.getConnection(function(error, connection) {
//     if(error) {
//         console.log(error.message);
//     }
//     console.log("Successful, state: " + connection.state);
// });

// exports.connect = function() {
//     connection.connect(function(error) {
//         if(error) {
//             throw error;
//         }
//     });
//     console.log("Successful connection");
// }

class Management {
    static getInstance() {
        return instance ? instance : new Management();
    }

    async getUserByID(id) {
        try {
            const response = await new Promise(function(resolve, reject) {
                const sql = "SELECT * FROM user WHERE user_ID = ?";
                connection.query(sql, [id], function(error, result, fields) {
                    if(error) {
                        reject(new Error(error.message));
                    }
                    resolve(result);
                });
            });
            console.log(response);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    async getAllUsers() {
        try {
            const response = await new Promise(function(resolve, reject) {
                const sql = "SELECT * FROM user";
                connection.query(sql, function(error, result, fields) {
                    if(error) {
                        reject(new Error(error.message));
                    }
                    resolve(result);
                });
            });
            console.log(response);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    async selectFromTable(table, attributeList) {
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
    
    async selectAllFromTable(table) {
        let sql = "SELECT * FROM " + table;
        connection.query(sql, function(error, result) {
            if(error) {
                console.log("Cannot retrieve entire data from " + table);
            }
            console.log(result);
        });
    }

    async insertIntoTable(table, values) {
        let sql = "INSERT INTO " + table + " VALUES ?";
        pool.query(sql, [values], function(error, results, fields) {
            if(error) {
                console.log("Cannot add record into " + table);
                if(table === "User") {
                    alert("Account cannot be created. Please try again.");
                }
            }
            console.log(result);
        });
    }
}

module.exports = Management;