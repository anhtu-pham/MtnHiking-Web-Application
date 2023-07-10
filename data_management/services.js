let mysql = require("mysql2");
// let dotenv = require("dotenv");
// dotenv.config();

// let connection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD
// });

const pool = require(__dirname + "/database.js");

let instance = null;

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

class Services {
    static getInstance() {
        return instance ? instance : new Services();
    }

    async select(table, isAll, attributes) {
        try {
            const response = await new Promise((resolve, reject) => {
                let sql = isAll ? 'SELECT * FROM ' + table : mysql.format('SELECT ? FROM ' + table, [attributes]);
                pool.query(sql, (error, results, fields) => {
                    if(error) {
                        console.log("Cannot retrieve entire data from " + table);
                        reject(new Error(error.message));
                    }
                    resolve(results);
                });
            });
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    async selectConditionally(table, isAll, attributes, conditions) {
        try {
            const response = await new Promise((resolve, reject) => {
                let sql = isAll ? mysql.format('SELECT * FROM ' + table + ' WHERE ?', [conditions]) : mysql.format('SELECT ? FROM ' + table + ' WHERE ?', [attributes, conditions]);
                pool.query(sql, (error, results, fields) => {
                    if(error) {
                        console.log("Cannot retrieve data from " + table);
                        reject(new Error(error.message));
                    }
                    resolve(results);
                });
            });
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    async insertIntoTable(table, values) {
        try {
            const response = await new Promise((resolve, reject) => {
                let sql = 'INSERT INTO ' + table + ' SET ?';
                pool.query(sql, [values], (error, results, fields) => {
                    if(error) {
                        console.log("Cannot add record into " + table);
                        if(table === "user") {
                            alert("Account cannot be created. Please try again.");
                        }
                        reject(new Error(error.message));
                    }
                    resolve(results);
                });
            });
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = Services;