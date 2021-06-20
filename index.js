const mysql = require('mysql');
const cTable = require('console.table');
const inquirer = require('inquirer');


//Connection to DB
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port, if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'root',
    database: 'employeeDB',
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    //connection.end();
});

const updateBucket = []

//Inquirer
const menu = () => {
    inquirer
        .prompt({
            name: 'menu',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View all Employees',
                'View all Departments',
                'View all Roles',
                'Update Employee Role',
                'Add Employee',
                'Add Department',
                'Add Role',
                'End',
            ],
        })
        .then((answer) => {
            switch (answer.menu) {
                case 'View all Employees':
                    viewEmployees();
                    break;
                case 'View all Departments':
                    viewDepartments();
                    break;
                case 'View all Roles':
                    viewRoles();
                    break;
                case 'Update Employee Role':
                    updateRole();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                default:
                    quitter();
            }
        });
};

const viewEmployees = () => {

    const query = 'SELECT * FROM employee LEFT JOIN department ON employee.id = department.id JOIN roles ON department.id = roles.id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log("All Employee Information")
        menu();

    });

};

const viewDepartments = () => {

    const query = 'SELECT * FROM department'
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log("Here are the Departments")
        menu();



    });

};

const viewRoles = () => {

    const query = 'SELECT * FROM roles'
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log("Here are the Roles")
        menu();

    });

};

const addEmployee = () => {
    inquirer
        .prompt([

            {
                type: 'input',
                name: 'first',
                message: 'What is the first name?',
            },
            {
                type: 'input',
                name: 'last',
                message: 'What is the last name?',
            },
            {
                type: 'input',
                name: 'roleID',
                message: 'What is the role ID?',
            },

            {
                type: 'input',
                name: 'managerID',
                message: 'What is the manager ID?',
            }
        ])
        .then((data) => {
            console.log('Updating all Rocky Road quantities...\n');
            const query = connection.query(
                'INSERT INTO employee SET ?',

                {
                    first_name: data.first,
                    last_name: data.last,
                    role_id: data.roleID,
                    manager_id: data.managerID
                },


                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} products updated!\n`);


                    console.log("Added Employee")

                    menu();

                });
        });
}

const addDepartment = () => {
    inquirer
        .prompt([

            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the department?',
            }
        ])
        .then((data) => {

            const query = connection.query(
                'INSERT INTO department SET ?',

                {
                    name: data.departmentName

                },


                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} department added!\n`);
                    menu();

                });
        });
}

const addRole = () => {
    inquirer
        .prompt([

            {
                type: 'input',
                name: 'jobTitle',
                message: 'What is the roles name?'
            },
            {
                type: 'input',
                name: 'pay',
                message: 'What is the salary',
            },
            {
                type: 'input',
                name: 'departmentID',
                message: 'What is the department ID?',
            }
        ])
        .then((data) => {

            const query = connection.query(
                'INSERT INTO roles SET ?',

                {
                    title: data.jobTitle,
                    salary: data.pay,
                    department_id: data.departmentID,

                },


                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} role added!\n`);
                    menu();

                });
        });
}

const updateRole = () => {
    //Get Employee list from database
    const query = 'SELECT first_name FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        //console.log(res);
        console.log("All Employee Information")
        //pass employee into the next function 
        passInfo(res);
    })}
    //map over the array to select out just the employee name
    const passInfo = (res) => {
        //console.log(res);
        newOBJ = res.map(function (element) {
            return `${element.first_name}`
        })
        console.log("+++++++")
        console.log(newOBJ)
        inquirer
            .prompt([

                {
                    type: 'list',
                    name: 'employee',
                    message: 'Which employee would you like to update?',
                    choices: newOBJ,
                },
                {
                    type: 'input',
                    name: 'roleSelection',
                    message: 'What is the new role ID?',
    
                },

            ])
            .then ((data) => {
                //hold the employee name in newEmployee
                newEmployee = data.employee
                newRole = data.roleSelection

                console.log(newEmployee)
                console.log(newRole)
                insertEmployee();
            })
          
        
        }
const insertEmployee = () => {
        const query = connection.query(
            'UPDATE Employee SET ? WHERE  ?',
            [
                {
                    role_id: `${newRole}`,
                },
                {
                    first_name: `${newEmployee}`,
                },
            ],

            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} role added!\n`);
                menu();

            });
    console.log("oh yah")

}

function quitter() {
    console.log("Thank you")
    //connection.end();
    process.exit();
}

menu();