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
            message: "Name of department?"
        }
    ])
}