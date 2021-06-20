INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Temi', 'Jimoh', '4', '1'),
('Brandon', 'Cowley', '1', '1'),
('Mike', 'Zadra', '1', '1'),
('Trenton', 'Rhines', '2', '1'),
('Daniel', 'Mosso', '3', '1');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Grunt', '30000', '1'),
('Admin', '40000', '2'),
('Engineer', '60000', '3'),
('Boss', '100000', '4');

INSERT INTO department (name)
VALUES 
('Field'),
('Office'),
('Engineering'),
('C-Level');