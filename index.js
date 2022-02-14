
// connect env file
require('dotenv').config()

//import mysql2
const mysql = require('mysql2');
//import inquirer
const inquirer = require('inquirer');
// import console.table
require('console.table'); 

// connection to database
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PW,
    database: process.env.DB_NAME
    },
    console.log(`Now connected to the ${process.env.DB_name} database. `)
);

const showOptions = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add an employee',
            'Add a department',
            'Add a role'
        ]

    }])
}

module.exports = db;