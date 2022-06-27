const inquirer = require("inquirer");
const { viewDepartments } = require("./department");

const viewQueryRoles = () => {
    return new Promise((resolve, reject) => {
        const db = require("../db/connections");
        const sql = `SELECT * FROM role`;
        db.query(sql, (err, res) => {
            if(err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
};

const viewRoles = () => {
    return new Promise((resolve, reject) => {
        const db = require("../db/connections");
        const sql = `SELECT role.id, role.title, role.salary, department.name AS department
            FROM role
            LEFT JOIN department ON role.department_id = department.id`;
        db.query(sql, (err, res) => {
            if(err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
};

function promptAddRole() {
    return Promise.resolve().then(() => {
        return viewDepartments();
    }).then((departments) => {
        return inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Name of role?",
                validate: textInput => {
                    if (textInput) {
                        return true;
                    } else {
                        console.log("Please enter name of role");
                    };
                }
            },
            {
                type: "input",
                name: "salary",
                message: "Salary of employee?",
                validate: textInput => {
                    if (textInput) {
                        return true;
                    } else {
                        console.log("Please enter salary");
                    };
                }
            },
        ]);
    }).then((response) => {
        return new Promise((resolve) => {
            const db = require("../db/connections");
            const sql = `INSERT INTO role(title, salary, department_id)
            VALUES
                ("${response.title}",
                "${response.salary}",
                (SELECT id FROM department WHERE name = "${response.department_id}"));`
            db.query(sql, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                console.log({
                    message: "Created new role",
                    changes: "rows.affectedRows",
                    title: response.title,
                    salary: response.salary,
                    department: response.department_id
                });
                return resolve(rows);
            })
        });
    });
};

module.exports = { viewQueryRoles, promptAddRole, viewRoles };


