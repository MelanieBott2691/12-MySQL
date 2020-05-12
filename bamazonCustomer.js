// for MySQL

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


// validate input makes sure tha the user is supplying only postive integers for tehir inputs

// prompt user will prompt the user for the item/quanityt they would like to promptUserPurchase

// prpompt user to select an item
function promptUserPurchase() {
    inquirer.prompt([
        {
    type: 'input',
    name: 'item_id',
    message: 'Please enter the Item ID of item you wish to purchase',
    validate: validateInput,
    filter: Number
},
{
    type: 'input',
    name: 'quantity',
    message: 'Please enter amount of items you wish to purchase',
    validate: validateInput,
    filter: Number
}
    ]).then(function(input) {
        var item = input.item_id;
        var quantity = input.quantity;
        
    })
//

connection.connect();


// connection.end();

console.log("-----------------------------------------\n");

promptUserPurchase();

})
}
function runBamazon(){
    
// display inventory that is available
displayInventory();
}
// run application
runBamazon();