// for MySQL

var mysql = require("mysql");
var inquirer = require("inquirer");

// Define connections
var connection = mysql.createConnection( {
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});



// prompt user will prompt the user for the item/quanityt they would like to promptUserPurchase

// prompt user to select an item
function promptUserPurchase() {
    inquirer.prompt([
        {
    type: 'input',
    name: 'item_id',
    message: 'Please enter the ID of product you would like to purchase.',
},
{
    type: 'input',
    name: 'stock_quantity',
    message: 'How many units would you like to purchase?',
}
    ]).then(function(input) {
        var item = input.item_id;
        var quantity = input.stock_quantity;
        
        var queryString = 'SELECT * FROM products WHERE ?';
        connection.query(queryString, {item_id: item}, function(err, data) {
            if (err) throw err;
            if (data.length === 0) {
                console.log("ERROR");
                displayInventory();
            }else{
                var productData = data[0];
                if (quantity <= productData.stock_quantity) {
                    console.log("Congratulations! The product is available");
                    var updateQueryString = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
           
                    //    update inventory
            connection.query(updateQueryString, function(err, data) {
                if (err) throw err;
                
                console.log("Your order has been placed!");
                console.log("Thank you for shopping with us!");
                console.log("\n--------------------------------------------------\n");

                connection.end();
            })
                } else {
                    console.log('Insufficient quantity!');
					// console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

					displayInventory();
                }
            }
        })
    })
}
function displayInventory() {
    queryString = "SELECT * FROM products";

connection.query(queryString, function(err, data) {
    if (err) throw err;
    console.log("Existing Inventory: ");
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