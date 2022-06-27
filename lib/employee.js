const inquirer = require("inquirer");
const { retry } = require("rxjs");
const { viewQueryRoles } = require("./role");

const viewQueryEmployees = () => {
    return new Promise((resolve, reject) => {
        const db = require("../db/connections");
        const sql = `Select * FROM employee`;
        db.query(sql, (err, res) => {
            if(err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
};

const viewEmployees = () => {
    return new Promise((resolve, reject) => {
        const db = require("../db/connections");
        const sql = `Select employee id,
            employee.first_name, 
            employee.last_name,
            role.title,
            department.name,
            role.salary,
            CONCAT (manager.first_name, " ", manager.last_name) AS manager
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id`;
        db.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
};

function promptAddEmployee() {
    return Promise.resolve().then(() => {
        return Promise.all([
            viewQueryRoles(),
            viewQueryEmployees()
        ]);
    }).then(([roles, employees]) => {
        return inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter employee's first name?",
                validate: textInput => {
                    if(textInput) {
                        return true;
                    } else{
                        console.log("Please enter employee's first name!");
                        return false;
                    };
                }
            },
            {
                type: "input",
                name: "last_name",
                message: "Enter employee's last name?",
                validate: textInput => {
                    if(textInput) {
                        return true;
                    } else{
                        console.log("Please enter employee's last name!");
                        return false;
                    };
                }
            },
            {
                type: "list",
                name: "role",
                message: "What is employee's role?",
                choices: roles.map((employeesRoleInfo) => {
                    return {
                        name:employeesRoleInfo.title,
                        value: employeesRoleInfo.id
                    }
                })
            },
            {
                type: "list",
                name: "manager_id",
                message: "Enter employee's manager?",
                choices: employees.map((employeesInfo) => {
                    return {
                        name:employeesInfo.first_name + " " + employeesInfo.last_name,
                        value: employeesInfo.id
                    }
                })
            }
        ]);
    }).then((response) => {
        return new Promise ((resolve, reject) => {
            const db = require("../db/connections");
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES
            ("${response.first_name}",
            "${response.last_name}",
            "${response.role}",
            "${response.manager_id}")`;
        db.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            console.log({
                message: "New Employee Created",
                changes: rows.affectedRows,
                first_name: response.first_name,
                last_name: response.last_name,
                role: response.role,
                manager: response.manager_id
            });
            return resolve(rows);
            });
        });
    });
};

function updateEmployee() {
    return Promise.resolve().then(() => {
        return Promise.all([
            viewQueryRoles(),
            viewQueryEmployees()
        ]);
    }).then(([roles, employees]) => {
            return inquirer.prompt([
                {
                    type: "list",
                    name: "name",
                    message: "Which employee do you want to update?",
                    choices: employees.map((employeesInfo) => {
                        return {
                            name: employeesInfo.first_name + " " + employeesInfo.last_name,
                            value: employeesInfo.id
                        }
                    })
                },
                {
                    type: "list",
                    name: "role",
                    message: "Enter employee's role",
                    choices: employees.map((employeesInfo) => {
                        return {
                            name: employeesInfo.first_name + " " + employeesInfo.last_name,
                            value: employeesInfo.id
                        }
                    })
                },
        ]).then((response) => {
            return new Promise ((resolve, reject) => {
                const db = require("../db/connections");
                const sql = `UPDATE employee SET
                employee.role_id = "${response.role}"
                WHERE employee.id = "${response.id}"`;
                db.query(sql, (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    console.log("Employee Updated!");
                    return resolve(rows);
                });
            });
        });
    })
};

module.exports = { viewQueryEmployees, promptAddEmployee, viewEmployees, updateEmployeeRole };
