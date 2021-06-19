DROP DATABASE IF EXISTS eDB;
CREATE database employeeDB;;

USE employeeDB;;

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

CREATE Table role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salaray INT,
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30)
)
