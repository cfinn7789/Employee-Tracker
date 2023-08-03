const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
    {
      host: 'localhost',
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
    ]);
  
    console.log(`You selected: ${userPrompts.selectedItem}`);
  })();

// To Do: 