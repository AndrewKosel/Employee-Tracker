const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeedb"
});

connection.connect(err => {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    promptUser();
});

// function which prompts the user for what action they should take

function promptUser() {
    inquirer
        .prompt({
            name: "choices",
            type: "list",
            message: "Select from the below options:",
            choices: [
                "View All Employees",
                "View All Roles",
                "View All Departments",
                "Add Employee",
                "Add Roles",
                "Add Department",
                "Update Employee",
                "Remove Employee",
                "Exit",
            ]
        })
        .then((answers) => {
            const { choices } = answers;

            if (choices === "View All Employees") {
                viewEmployee();
            }

            if (choices === "View All Departments") {
                viewDepartment();
            }

            if (choices === "View All Roles") {
                viewRole();
            }
            if (choices === "Add Roles") {
                addRole();
            }
            if (choices === "Add Employee") {
                addEmployee();
            }

            if (choices === "Remove Employee") {
                removeEmployee();
            }

            if (choices === "Update Employee Role") {
                updateRole();
            }


            if (choices === "Add Department") {
                addDepartment();
            }

            if (choices === "Exit") {
                connection.end();
            }
        });
};

function viewEmployee() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
}

function viewDepartment() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
}

function viewRole() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
}

// function viewManager() {
//     connection.query("SELECT * FROM role", function(err, res) {
//         if (err) throw err;
//         console.table(res);
//         promptUser();
//     });
// }

function addEmployee() {
    inquirer
        .prompt([{
                name: "first_name",
                type: "input",
                message: "Enter the employee's first name",
            },
            {
                name: "last_name",
                type: "input",
                message: "Enter the employee's last name",
            },
            {
                name: "role_id",
                type: "input",
                message: "Enter the employee's role id",
            },
            {
                name: "manager_id",
                type: "input",
                message: "Enter the employee's manager id",
            }
        ])
        .then(function(answer) {
            connection.query("INSERT INTO employee SET ?", {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id || 0,
                    manager_id: answer.manager_id || 0
                },
                function(err) {
                    if (err) throw err;
                    console.log("You have successfully added an employee");
                    promptUser();
                }
            );
        });
};



function exit() {
    console.log("Thank you From Michael Scott");
    connection.end();
}