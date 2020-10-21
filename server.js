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
                "View Managers",
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

            if (choices === "View Managers") {
                viewManager();
            }
            if (choices === "Exit") {
                exit();
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

function viewManager() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
}

function addEmployee() {
    inquirer
        .prompt([{
                name: "first_name",
                type: "input",
                message: "Enter first name of employee",
            },
            {
                name: "last_name",
                type: "input",
                message: "Enter last name of employee",
            },
            {
                name: "role_id",
                type: "input",
                message: "Enter employee's role id",
            },
            {
                name: "manager_id",
                type: "input",
                message: "Enter employee's manager id",
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

function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "Enter the department you would like to add"
        })
        .then(function(answer) {
            connection.query("INSERT INTO department SET ?", { name: answer.department },
                function(err) {
                    if (err) throw err;
                    console.log("You have added a new department!");
                    promptUser();
                }
            );
        });
};

function addRole() {
    inquirer
        .prompt([{
                name: "title",
                type: "input",
                message: "Please enter the role's title",
            },

            {
                name: "salary",
                type: "input",
                message: "Please enter the salary for the role",
            },

            {
                name: "department_id",
                type: "input",
                message: "Please enter the ID for this department",
            }
        ])
        .then(function(answer) {
            connection.query("INSERT INTO role SET ?", {
                    title: answer.title,
                    salary: answer.salary || 0,
                    department_id: answer.department_id || 0
                },
                function(err) {
                    if (err) throw err;
                    console.log("Role Added");
                    promptUser();
                }
            );
        });
    h
};

function removeEmployee() {
    inquirer
        .prompt([{
            name: "id",
            type: "input",
            message: "Please enter the Employee id",

        }]).then(function(answer) {
            connection.query("DELETE FROM employee WHERE id = ?", [answer.id],
                function(err) {
                    if (err) throw err;
                    console.log("You have successfully removed the employee");
                    promptUser();
                })
        })
}

updateRole = () => {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "updateRole",
                type: "list",
                message: "Which employee do you want to make changes to",
                choices: function() {
                    var inputArray = [];
                    for (var i = 0; i < res.length; i++) {
                        inputArray.push(res[i].last_name);
                    }
                    return inputArray;
                }
            }])
            .then(function(answer) {
                inquirer
                    .prompt([{
                        name: "changeRole",
                        type: "input",
                        message: "What do you want the new employees role to be"
                    }, ])
                    .then(function(roleAnswer) {
                        connection.query("UPDATE employee SET role_id = ? WHERE last_name = ?", [roleAnswer.changeRole, answer.updateRole]);
                        console.log("You have successfully updated  the employee");
                        promptUser();
                    })

            });
    })
};

function exit() {
    console.log("Leaving Dunder Mifflin DB");
    connection.end();
}