INSERT INTO departments (name)
VALUES
("Egineering"),
("Finance"),
("Legal"),
("Sales")
;

INSERT INTO roles (title, department_id, salary)
VALUES
("Sales Lead", 4, 100000),
("Salesperson", 4, 80000),
("Lead Engineer", 1, 150000),
("Software Engineer", 1, 120000),
("Account Manager", 2, 160000),
("Accountant", 2, 125000),
("Legal Team Lead", 3, 190000), -- Added missing parenthesis and comma
("Lawyer", 3, 250000);

INSERT INTO employees (first_name, last_name, role_id)
VALUES
("John", "Doe", 1), -- Assign the appropriate role_id for each employee
("Jane", "Doe", 2),
("Chris", "Smith", 3),
("Lori", "Harvey", 4);

