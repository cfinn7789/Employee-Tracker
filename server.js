const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const app = express();

const db = mysql.createConnection(
    {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

(async () => {
    const userPrompts = await inquirer.prompt([
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
        'Quit']
      }
    ])
    .then(answer => {
        answer.input === "View All Employees" ? viewAllEmployees():
        answer.input === "Add Employee" ? addEmployee():
        answer.input === "Update Employee Role" ? updateRole():
        answer.input === "View All Roles" ? viewRole():
        answer.input === "Add Roles" ? addRole():
        answer.input === "View All Departments" ? viewDepartment():
        answer.input === "Add Department" ? addDepartment():
        null;
      })
  })();

// To Do: 