const inquirer = require("inquirer");
require('console.table');

const { viewDepartments, promptAddDepartment } = require("./lib/department");
const { viewRoles, promptAddRole } = require("./lib/role");
const { viewEmployee, promptAddEmployee, updateEmployeeRole } = require("./lib/employee");
const { up } = require("inquirer/lib/utils/readline");

const mainPrompt = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "mainPrompt",
            message: "What would you like to do?",
            choices:
                [
                    "View all departments",
                    "View all roles", 
                    "View all employees",
                    "Add department",
                    "Add role",
                    "Add employee",
                    "Update employee role",
                    "Quit",
                ]
        },
    ]).then(response => {
        switch (response.mainPrompt) {
            case "View all departments":
                return viewDepartments().then((res) => {
                    console.table(res)
                });
            case "View all roles":
                return viewRoles().then((res) => {
                    console.table(res)
                });
            case "viewEmployee":
                return viewEmployee().then((res) => {
                    console.table(res)
                });
            case "Add department":
                return promptAddDepartment();
            case "Add role":
                return promptAddRole();
            case "Add employee":
                return promptAddEmployee();
            case "Update employee role":
                return updateEmployeeRole();
            case "Quit":
                return process.exit();
        };
    }).then(() => {
        mainPrompt();
    })
};

mainPrompt();
