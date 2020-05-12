// for MySQL

// call for dependencies 
var mysql = require("mysql");
var inquirer = require("inquirer");

// Define connections
var connection = mysql.createConnection( {
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "bamazon"
});

function promptManager() {

    //prompt manager to selet an option
    inquirer.prompt([
        type:
        name:
        message:
        choices:
    
    ])
}

// trigger the appropriate action based on the user input
// Retrieve the current inventory from the databse and output it to the console


// construct the db query string 

// make the db query

// show to display a list of products with the available quantity below 100

// construct the db query string

// make the dp query




console.log("\n-----------------------------------------\n");
// end the database connection
connection.end();

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
connection.end();

// createNewProduct will guide the user in adding a new product to the inventory


	// Prompt the user to enter information about the new product

// Create the insertion query string

// Add new product to the db

// End the database connection
connection.end();

// runBamazon will execute the main application logic
function runBamazon(){
    // prompt manager input
promptManager();
}
// run application
runBamazon();