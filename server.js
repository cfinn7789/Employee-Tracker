const inquirer = require('inquirer');
const mysql = require('mysql2');
require("console.table");

const db = mysql.createConnection(
    {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'employees_db'
    },
  );

console.log('Connected to the employees_db database.');

(async function menuPrompts() {
     await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedItem',
        message: 'What would you like to do?',
        choices: 
        ['View All Employees', 
        'Add Employee', 
        'Update Employee Role', 
        'View All Roles', 
        'Add Roles', 
        'View All Departments', 
        'Add Department',
        'Quit'],
      },
    ])
    .then((answer) => {
      switch (answer.selectedItem) {
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateRole();
          break;
        case 'View All Roles':
          viewRole();
          break;
        case 'Add Roles':
          addRole();
          break;
        case 'View All Departments':
          viewDepartment();
          break;
        case 'Add Department':
          addDepartment();
          break;
        default:
          break;
      }
    }).catch((err) => console.log(err));
})();

function viewAllEmployees() {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      console.error('Error retrieving employees:', err);
      return;
    }
    console.table(results);
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the employee:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the employee:'
    },
  ])
  .then((answers) => {
    const sql = 'INSERT INTO employee (first_name, last_name) VALUES (?, ?)';
    const values = [answers.firstName, answers.lastName];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding employee:', err);
      } else {
        console.log(`Employee ${answers.firstName} ${answers.lastName} added successfully.`);
      }
    });
  });
}

function viewRole() {
  db.query('SELECT * FROM role', (err, results) => {
    if (err) {
      console.error('Error retrieving roles:', err);
      return;
    }
    console.table(results);
  });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'role',
        message: 'Enter the title of the role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for this role (optional):',
      },
      {
        type: 'list',
        name: 'department',
        message: 'Enter the department for this role:',
        choices: ["Engineering", "Finance", "Legal", "Sales", "Service"]
      },
    ])
    .then((answers) => {
      const roleTitle = answers.role.trim();
      const salary = answers.salary ? parseFloat(answers.salary) : null;
      const departmentName = answers.department ? answers.department.trim() : null;

      if (!roleTitle) {
        console.error('Role title cannot be empty.');
        return;
      }
      const roleInsertSql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, (SELECT id FROM department WHERE department_name = ?))';
      const roleInsertValues = [roleTitle, salary, departmentName];

      db.query(roleInsertSql, roleInsertValues, (err, result) => {
        if (err) {
          console.error('Error adding role:', err);
        } else {
          console.log(`Role '${roleTitle}' added successfully.`);
        }
      });
    });
}