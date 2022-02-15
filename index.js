
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

// function to add roles

// function to add employees

// function to show departments

// function to show roles

//function to show employees

// function to delete a department

//function to delete a role

// function to delete an employee

showOptions();