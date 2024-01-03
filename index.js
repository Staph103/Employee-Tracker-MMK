//function, commonly used for module imports in Node.js applications
const fs = require('fs')
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
            case 'Add a department':
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'dept',
                            message: 'What is the name of the department? ',
                        },
                    ]).then((res) => {
                        const newDept = res.dept;
                        db.query(`INSERT INTO departments (name) VALUES('${newDept}'); `, function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            console.log('Added ' + newDept + ' to the database');
                            console.log(result);
                        });
                    })

            case 'View all roles':

                db.query(`SELECT * FROM roles `, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(result);
                })

                break;

            case 'Add a role':
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'role',
                            message: 'What is the name of the role? ',
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'What is the salary of the role? ',
                        },
                        {
                            type: 'list',
                            name: 'dept',
                            message: 'Which department does this role belong to? ',
                            choices: ["Egineering","Finance","Legal","Sales"]
                        },

                    ]).then((res) => {
                        const newRole = res.role;
                        db.query(`INSERT INTO roles (title, department_id, salary) VALUES('${newRole}',${res.dept},${res.salary}); `, function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            console.log('Added ' + newRole + ' to the database');
                            console.log(result);
                        });
                    })


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