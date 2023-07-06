// let mysql = require("mysql2");
// let dotenv = require("dotenv");
// dotenv.config();

// let connection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD
// });

pool = require(__dirname + "/database.js");

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

    async select(table, isAll, attributeList) {
        try {
            const response = await new Promise(function(resolve, reject) {
                if(isAll) {
                    let sql = 'SELECT * FROM ' + table;
                    pool.query(sql, function(error, result, fields) {
                        if(error) {
                            console.log("Cannot retrieve entire data from " + table);
                            reject(new Error(error.message));
                        }
                        resolve(result);
                    });
                }
                else {
                    let sql = 'SELECT ? FROM ' + table;
                    pool.query(sql, [attributeList], function(error, result, fields) {
                        if(error) {
                            console.log("Cannot retrieve entire data from " + table);
                            reject(new Error(error.message));
                        }
                        resolve(result);
                    });
                }

            });
            console.log(response);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    async selectConditionally(table, isAll, attributeList, conditions) {
        try {
            const response = await new Promise(function(resolve, reject){
                if(isAll) {
                    let sql = 'SELECT * FROM ' + table + ' WHERE ?';
                    pool.query(sql, [conditions], function(error, result) {
                        if(error) {
                            console.log("Cannot retrieve data from " + table);
                            reject(new Error(error.message));
                        }
                        resolve(result);
                    });
                }
                else {
                    let sql = 'SELECT ? FROM ' + table + ' WHERE ?';
                    pool.query(sql, [attributeList, conditions], function(error, result) {
                        if(error) {
                            console.log("Cannot retrieve data from " + table);
                            reject(new Error(error.message));
                        }
                        resolve(result);
                    });
                }
            });
            console.log(response);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    async insertIntoTable(table, values) {
        try {
            const response = await new Promise(function(resolve, reject){
                let sql = 'INSERT INTO ' + table + ' VALUES ?';
                pool.query(sql, [values], function(error, result) {
                    if(error) {
                        console.log("Cannot add record into " + table);
                        if(table === "user") {
                            alert("Account cannot be created. Please try again.");
                        }
                        reject(new Error(error.message));
                    }
                    resolve(result);
                });
            });
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = Services;