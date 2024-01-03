//function, commonly used for module imports in Node.js applications
const fs = require('fs')
const generateMarkdown = require('./utils/mdGenerator')
const inquirer = require('inquirer');
const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password
        password: 'rootroot',
        database: 'directory_db'
    },
    console.log(`Connected to the books_db database.`)
);


inquirer
    .prompt([

        // Pass your questions in here 
        {
            type: 'list',
            name: 'departments',
            message: 'Welcome to MMK LLC',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        },

    ]).then((res) => {
        let newShape;
        //
        switch (res.choices) {
            case 'View all departments':

                db.query(`SELECT * FROM departments `, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(result);
                });

                break;

            case 'View all roles':

                db.query(`SELECT * FROM roles `, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(result);
                })

                    break;

            case 'View all employees':

                db.query(`SELECT * FROM employees `, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(result);
                })
                break;

        }
    })

//creates the svg file based on data retrieved from user input

db.query(`SELECT * FROM departments `, function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

// Query database
db.query('SELECT * FROM course_names', function (err, results) {
    console.log(results);
});
