--This checks if there are any existing 
DROP DATABASE IF EXISTS directory_db;
CREATE DATABASE directory_db;

USE directory_db;

CREATE TABLE departments (

id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL

);

CREATE TABLE roles (

 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(30) NOT NULL,
 salary DECIMAL(10,2) NOT NULL,
 department_id INT,
 FOREIGN KEY (department_id) REFERENCES departments(id)
 

);


CREATE TABLE employees (
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 first_name VARCHAR(30) NOT NULL,
 last_name VARCHAR(30) NOT NULL,
 role_id INT,
 manager_id INT,
 FOREIGN KEY (role_id) REFERENCES roles(id),
 FOREIGN KEY (manager_id) REFERENCES employees(id)
);



