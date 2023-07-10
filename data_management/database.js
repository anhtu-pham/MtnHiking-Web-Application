let mysql = require("mysql2");
let dotenv = require("dotenv");
dotenv.config();

let pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
});

module.exports = pool;