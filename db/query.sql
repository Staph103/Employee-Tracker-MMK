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
   LEFT JOIN employees manager `,