//function, commonly used for module imports in Node.js applications
const fs = require('fs')
const generateMarkdown = require('./utils/mdGenerator')
const inquirer = require('inquirer');

inquirer
    .prompt([

        // Pass your questions in here 
        {
            type: 'list',
            name: 'departments',
            message: 'Welcome to MMK LLC',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role','Add an employee','Update an employee role']
        },

    ])

