// BONUS

// call for dependencies 
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table");

// Define connections
var connection = mysql.createConnection( {
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "bamazon"
});

// SETUP
// ================================================================================
connection.connect((err) => {
    if (err) throw err;
    console.log('Connection successful');
    resetData();
    // display all items from database once mysql connection has been established
    displayMenu();
    // departments();
});

// FUNCTIONS
// =================================================================================
var resetData = function() {
   
};

var displayMenu = function() {
    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: 'Choose an action:',
        choices: [
            'View Departments',
            'View Product Sales by Department',
            'Add New Product'
        ]
    }).then((answer) => {
        switch (answer.action) {
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Products Sales by Department':
                viewDepartmentSales();
                break;
            case 'Create New Department':
                createDepartment();
                break;
        }
    });
};

var viewDepartments = function() {
    connection.query('SELECT * FROM departments', (err, res) => {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].department_id, res[i].department_name)
            console.log("------------------------------------------------")
        }
            connection.end();
    });
};

var viewDepartmentSales = function() {
    connection.query('SELECT * FROM departments', (err, res) => {
        for (var i = 0; i < res.length; i++) {
            console.log('Department Name: ' + res[i].department_name + 'Product Sales: ' + res[i].product_sales);
            console.log("------------------------------------------------");
        }
        connection.end();
    });
};

var createDepartment = function() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Enter the department name:'
        },
    ]).then((answers) => {
        connection.query('INSERT INTO departments SET ?', {
            department_name: answers.name,
        }, (err, res) => {
            if (err) throw err;
            console.log('\n\tDepartment successfully added!\n');
            connection.end();
        });
    });
};