//function, commonly used for module imports in Node.js applications
const fs = require("fs");
const inquirer = require("inquirer");
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password
    password: "rootroot",
    database: "directory_db",
  },
  console.log(`Connected to the directory_db database.`)
);

function menu() {
  inquirer
    .prompt([
      // Pass your questions in here
      {
        type: "list",
        name: "departments",
        message: "What would you like to do ",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "QUIT",
        ],
      },
    ])
    .then((res) => {
      //
      switch (res.departments) {
        case "View all departments":
          viewDept();
          break;

        case "Add a department":
          addDept();
          break;

        case "View all roles":
          viewRoles();

          break;

        case "Add a role":
          addRole();
          break;

        case "View all employees":
          viewEmp();
          break;

        case "Add an employee":
          addEmp();
          break;

        case "Update an employee role":
          updateRole();
          break;

        case "QUIT":
          db.end();
          break;
      }
    });
}
function viewDept() {
  db.query(`SELECT * FROM departments `, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.table(result);
    menu();
  });
}
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dept",
        message: "What is the name of the department? ",
      },
    ])
    .then((res) => {
      const newDept = res.dept;
      db.query(
        `INSERT INTO departments (name) VALUES(?); `,
        [newDept],
        function (err, result) {
          if (err) {
            console.log(err);
          }
          console.log("Added " + newDept + " to the database");
          menu();
        }
      );
    });
}
function viewRoles() {
  db.query(
    `SELECT roles.id, departments.name, roles.title, roles.salary from departments JOIN roles on departments.id = roles.department_id `,
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.table(result);
      menu();
    }
  );
}
function addRole() {
  db.query(
    `SELECT id AS value, name AS name FROM departments`,
    (err, results) => {
      // console.log(results);
      const roles = results;

      inquirer

        .prompt([
          {
            type: "input",
            name: "role",
            message: "What is the name of the role? ",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary of the role? ",
          },
          {
            type: "list",
            name: "dept",
            message: "Which department does this role belong to? ",
            choices: roles,
          },
        ])
        .then((res) => {
          const newRole = res.role;
          const salary = res.salary;
          const dept = res.dept;
          db.query(
            `INSERT INTO roles (title, department_id, salary) VALUES(?,?,?); `,
            newRole,
            dept,
            salary,
            function (err, result) {
              if (err) {
                console.log(err);
              }
              console.log("Added " + newRole + " to the database");
              menu();
            }
          );
        });
    }
  );
}
function viewEmp() {
  db.query(
    `SELECT employees.id, employees.first_name AS "first name", 
    employees.last_name AS "last name", 
    roles.title, departments.name AS department, 
    roles.salary, 
    concat(manager.first_name, " ", manager.last_name) AS manager
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT JOIN employees ON employees.manager_id = manger.manager_id `,
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.table(result);
      menu();
    }
  );
}
function addEmp() {
  db.query(`SELECT id AS value, title AS name FROM roles`, (err, results) => {
    const roles = results;

    inquirer

      .prompt([
        {
          type: "input",
          name: "fname",
          message: "What is the employees first name ?",
        },
        {
          type: "input",
          name: "lname",
          message: "What is the employees last name ",
        },
        {
          type: "list",
          name: "role",
          message: "Whats the employees role ? ",
          choices: roles,
        },
      ])
      .then((res) => {
        const fname = res.fname;
        const lname = res.lname;
        const role = res.role;
        const fullName = fname + " " + lname;
        db.query(
          `INSERT INTO roles (first_name, last_name, role_id) VALUES(?,?,?); `,
          fname,
          lname,
          role,
          function (err, result) {
            if (err) {
              console.log(err);
            }
            console.table(result);
            console.log("Added " + fullName + " to the database");
            menu();
          }
        );
      });
  });
}
function updateRole() {
  db.query(
    `SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employees`,
    (err, result) => {
      const emp = result;
      
      db.query(
        `SELECT id AS value, title AS name FROM roles`,
        (err, results) => {
          const roles = results;
          inquirer
            .prompt([
              {
                type: "list",
                name: "emp",
                message: "Which employee would you like to update ? ",
                choices: emp,
              },
              {
                type: "list",
                name: "role",
                message: "what role would you like to assign",
                choices: roles,
              },
            ])
            .then((res) => {
              console.log(res);
              const role = res.role;
              const empID = res.emp;
              db.query(
                "UPDATE employees SET role_id = ? WHERE id = ?",
                [role, empID],
                function (err, result) {
                  if (err) {
                    console.log(err);
                  }
                  console.table(result);
                  menu();
                }
              );
            });
        }
      );
    }
  );
}
menu();
