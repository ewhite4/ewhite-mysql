const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password:"123",
        database: "company",
    },
    console.log("Connected to Database")
);

module.exports = db;
