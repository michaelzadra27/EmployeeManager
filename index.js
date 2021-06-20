const mysql = require('mysql');
const cTable = require('console.table');
const inquirer = require('inquirer');

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

    const query = 'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        console.log("All Employee Information")
        menu();

    });

};

const viewDepartments = () => {

    const query = 'SELECT * FROM department'
    connection.query(query, (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        console.log("Here are the Departments")
        menu();
        
        

    });

};

const viewRoles = () => {

    const query = 'SELECT * FROM roles'
    connection.query(query, (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
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
function quitter() {
    console.log("Thank you")
    //connection.end();
    process.exit();
}

menu();