let mysql = require("mysql2");
let dotenv = require("dotenv");
let instance = null;
dotenv.config();

let connection = mysql.createConnection({
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

class Services {
    static getInstance() {
        return instance ? instance : new Services();
    }

    async getFromTable(table, attributeList) {
        try {
            const response = await new Promise(function(resolve, reject) {
                const sql = 'SELECT ? FROM ' + table;
                connection.query(sql, [attributeList], function(error, result, fields) {
                    if(error) {
                        console.log("Cannot retrieve entire data from " + table);
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

    async getFromTableConditionally(table, attributeList, conditions) {
        try {
            const response = await new Promise(function(resolve, reject){
                let sql = 'SELECT ? FROM ' + table + ' WHERE ?';
                connection.query(sql, [attributeList, conditions], function(error, result) {
                    if(error) {
                        console.log("Cannot retrieve data from " + table);
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

    async insertIntoTable(table, values) {
        try {
            const response = await new Promise(function(resolve, reject){
                let sql = 'INSERT INTO ' + table + ' VALUES ?';
                connection.query(sql, [values], function(error, result) {
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
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = Services;