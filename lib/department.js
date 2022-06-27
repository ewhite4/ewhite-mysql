const inquirer = require("inquirer");

const viewDepartments = () => {
    return new Promise(( resolve, reject ) => {
        const db = require("../db/connections");
        const sql = `SELECT * FROM department`;
        db.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve (res);
        }); 
    });
};

const promptAddDepartment = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Name of department?", 
            validate: textInput => {
                if (textInput) {
                    return true;
                } else {
                    console.log("Error: enter name of department!");
                    return false;
                };
            }
        }
    ]).then((response) => {
        return new Promise((resolve, reject) => {
            const db = require('../db/connections');
            const sql = `INSERT INTO department SET?`;
            const params = { name: response.department };
            db.query(sql, params, (err, row) => {
                if (err) {
                    return reject(err);
                }
                console.log({
                    message: "New department created",
                    changes: row.affectedRows,
                    data: params
                });
                return resolve(row);
            });
        });
    });
};

module.exports = { promptAddDepartment, viewDepartments };