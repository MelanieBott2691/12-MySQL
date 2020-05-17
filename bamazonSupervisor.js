// for MySQL

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

// connection.connect(function(err) {
// if (err) throw err;
// console.log("Success!");
// departments();
// });

// // department_id, department_name, over_head_costs from departments table
// function departments() {
//     connection.query("SELECT * FROM departments", function(err, res) {
//         if (err) throw err;
//         console.log(res[0].department_name);
//     });
// }



// ------------
    //prompt manager to selet an option
//     inquirer.prompt([
//         type:
//         name:
//         message:
//         choices:
    
//     ])
// }

// trigger the appropriate action based on the user input
// Retrieve the current inventory from the databse and output it to the console


// construct the db query string 

// make the db query

// show to display a list of products with the available quantity below 100

// construct the db query string

// make the dp query




// console.log("\n-----------------------------------------\n");
// end the database connection
// connection.end();

// validate makes sure that the user is supplying only positive integers for their inputs

// validate number makes sure that the user is supplying only positive numbers for their inputs

// value must be a positive number 

// add inventory will guilde a user in adding additional quantify to an existing item 

// prompt user to select an item 


// / Query db to confirm that the given item ID exists and to determine the current stock_count

//  // If the user has selected an invalid item ID, data attay will be empty
            // console.log('data = ' + JSON.stringify(data));
            
//// Construct the updating query string

// Update the inventory

// end database connection
// connection.end();

// createNewProduct will guide the user in adding a new product to the inventory


	// Prompt the user to enter information about the new product

// Create the insertion query string

// Add new product to the db

// End the database connection
// connection.end();

// runBamazon will execute the main application logic
// function runBamazon(){
    // prompt manager input
// promptManager();
// }
// run application
// runBamazon();
// SETUP
// =====================================================================================


connection.connect((err) => {
    if (err) throw err;
    console.log('Connection successful');
    resetData();
    // display all items from database once mysql connection has been established
    displayMenu();
});

// GLOBAL VARIABLES
// =====================================================================================
var deptToDelete = [];

// FUNCTIONS
// =====================================================================================
var resetData = function() {
    deptToDelete = [];
};

var displayMenu = function() {
    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: 'Choose an action:',
        choices: [
            'View Departments',
            'View Product Sales by Department',
            'Create New Department',
            'Delete A Department'
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
            case 'Delete A Department':
                deleteDepartment();
                break;
        }
    });
};

var viewDepartments = function() {
    connection.query('SELECT * FROM departments', (err, res) => {
        var listTable = new Table({
            head: ['Dept ID', 'Dept Name', 'Overhead'],
            colWidths: [10, 25, 12]
        });

        for (var i = 0; i < res.length; i++) {
            listTable.push([res[i].department_id, res[i].department_name, `$${res[i].over_head_costs}`])
            // console.log(chalk.blue.bold(`\n\tDept ID: ${res[i].department_id}\n\tDept Name: ${res[i].department_name}\n\tOverhead Costs: $${res[i].over_head_costs}\n`));
        }

        console.log(`\n\n${listTable.toString()}\n\n`);
        connection.end();
    });
};

var viewDepartmentSales = function() {
    connection.query(`SELECT * FROM products`, (err, res) => {
        for (var i = 0; i < res.length; i++) {
            console.log(chalk.blue.bold(`\n\tItem ID: ${res[i].item_id}\n\tProduct Name: ${res[i].product_name}\n\tPrice: $${res[i].price}\n`));
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
        {
            name: 'overhead',
            type: 'input',
            message: 'Enter the overhead costs for this department:',
            validate: (value) => {
                if (!isNaN(value) && value > 0) {
                    return true;
                } else {
                    console.log(chalk.red(' => Oops, please enter a number greater than 0'));
                    return false;
                }
            }
        },
    ]).then((answers) => {
        connection.query('INSERT INTO departments SET ?', {
            department_name: answers.name,
            over_head_costs: answers.overhead
        }, (err, res) => {
            if (err) throw err;
            console.log(chalk.blue.bold('\n\tDepartment successfully added!\n'));
            connection.end();
        });
    });
};

var deleteDepartment = function() {
    inquirer.prompt({
        name: 'deptID',
        type: 'input',
        message: 'Enter the ID of the department you\'d like to remove:'
    }).then((answer) => {
        connection.query('SELECT * FROM departments WHERE ?', { department_id: answer.deptID }, (err, res) => {
            inquirer.prompt({
                name: 'confirm',
                type: 'confirm',
                message: `You would like to delete` + chalk.blue.bold(` '${res[0].department_name}'. `) + `Is this correct?`
            }).then((answer) => {
                if (answer.confirm) {
                    deptToDelete.push(res);
                    connection.query('DELETE FROM departments WHERE ?', { department_id: deptToDelete[0][0].department_id }, (err, res) => {
                        if (err) throw err;
                        console.log(chalk.blue.bold('\n\tDepartment successfully deleted!\n'));
                        connection.end();
                    });
                } else {
                    deleteDepartment();
                }
            });
        });
    });
};