var mysql = require('mysql');
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
connection.connect();

function displayMenu() {
    inquirer.prompt({
        message: "Choose an action:",
        choices: [
            'View Departments',
            'View Product Sales by Department',
            'Create New Department'
        ]
        
    //  }).then(function(answer) {
    //     connection.query("SELECT * FROM bamazon WHERE ?", ({department_name: answer.department_name}), function(err, res) {
    //         if(err) throw err;
    //         console.log();
    //         start();
    //     });
    });
}
    