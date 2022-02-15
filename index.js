
// connect env file
require('dotenv').config()

//import mysql2
const mysql = require('mysql2');
//import inquirer
const inquirer = require('inquirer');
// import console.table
require('console.table'); 

// connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PW,
    database: process.env.DB_NAME
    },
    console.log(`Now connected to the ${process.env.DB_NAME} database. `)
);

const showOptions = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            {
                name: 'Add a department',
                value: 'addDepartment',
            },
            {
                name: 'Add a role',
                value: 'addRole',
            },
            {
                name: 'Add a employee',
                value: 'addEmployee',
            },
            {
            
                name: 'View all departments',
                value: 'viewDepartments',
            },
            {
                name: 'View all roles',
                value: 'viewRoles',
            },
            {
                name: 'View all employees',
                value: 'viewEmployees',
            },
            {
                name: 'View employees by department',
                value: 'empByDepartment',
            },
            {
                name: 'Delete a department',
                value: 'deleteDepartment',
            },
            {
                name: 'Delete a role',
                value: 'deleteRole',
            },
            {
                name: 'Delete an employee',
                value: 'deleteEmployee',
            },
            {
                name: 'View department budgets',
                value: 'viewBudgets',
            },
            {
                name: 'Quit',
                value: 'quit',
            },
        ]},
    ])
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })
}

// function to add departments
const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'newDpt',
            type: 'input',
            message: 'What is the name of the new department?',
            validate: newDpt => {
                if (newDpt) {
                    return true;
                } else {
                    console.log('Please enter a department');
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO department (name)
                    VALUES (?)`;
        db.query(sql, answer.newDpt, (err, res) => {
            if (err) throw err;
            console.log('Added ' + answer.newDpt + " to department table!"); 
    
            showDepartments();
        });
    });
};

// function to add roles
const addRole = () => {
    inquirer.prompt([
        {
            name: 'newRole',
            type: 'input', 
            message: "What role would you like to add?",
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('Please enter new role.');
                    return false;
                }
            }
        },
        {
            name: 'salary',
            type: 'input', 
            message: "What is this role's salary?",
            validate: enterSalary => {
                if (isNAN(enterSalary)) {
                    return true;
                } else {
                    console.log('Please enter salary for this role.');
                    return false;
                }
            }
        }
    ])
        .then(answer => {
            const params = [answer.role, answer.salary];
    
            // grab dept from department table
            const sqlRole = `SELECT name, id FROM department`; 
    
            db.promise().query(sqlRole, (err, data) => {
                if (err) throw err; 
        
            const department = data.map(({ name, id }) => ({ name: name, value: id }));
    
            inquirer.prompt([
            {
                name: 'dept',
                type: 'input', 
                message: "What department is this role in?",
                choices: department
            }
            ])
              .then(departmentChoice => {
                const department = departmentChoice.department;
                params.push(department);
    
                const sql = `INSERT INTO role (title, salary, department_id)
                            VALUES (?, ?, ?)`;
    
                db.query(sql, params, (err, res) => {
                    if (err) throw err;
                    console.log('Added' + answer.role + " to roles table!"); 
        
                    showRoles();
                });
            });
        });
    });
};    

// function to add employees
const addEmployee = () => {

}

// function to show departments
const showDepartments = () => {
    console.log('Showing departments...\n');
    const sql = `SELECT department.id AS id, department.name AS department FROM department`; 
  
    db.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        showOptions();
    });
}

// function to show roles
const showRoles = () => {
    console.log('Showing roles...\n');

    const sql = `SELECT role.id, role.title, department.name AS department
                FROM role
                INNER JOIN department ON role.department_id = department.id`;
    
    db.promise().query(sql, (err, rows) => {
        if (err) throw err; 
        console.table(rows); 
        showOptions();
    })
}

//function to show employees
const showEmployees = () => {
    console.log('Showing employees...\n'); 
    const sql = `SELECT employee.id, 
                        employee.first_name, 
                        employee.last_name, 
                        role.title, 
                        department.name AS department,
                        role.salary, 
                        CONCAT (manager.first_name, " ", manager.last_name) AS manager
                    FROM employee
                        LEFT JOIN role ON employee.role_id = role.id
                        LEFT JOIN department ON role.department_id = department.id
                        LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  
    db.promise().query(sql, (err, rows) => {
        if (err) throw err; 
        console.table(rows);
        showOptions();
    });
}

// function to delete a department
// const deleteDepartment = () => {

// }

//function to delete a role
// const deleteRole = () => {

// }

// function to delete an employee
// const deleteEmployee = () => {

// }

showOptions();