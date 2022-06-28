const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: "ew117mc@yahoo.com",
        user: "root",
        password:"Cortana@381",
        database: "company",
    },
    console.log("Connected to company database")
);

module.exports = db;
