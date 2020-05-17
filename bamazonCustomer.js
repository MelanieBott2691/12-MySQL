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
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    }else{
        return "Please enter a whole number";
    }
}
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
                    console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
					console.log('Please modify your order.');
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
    console.log("..........................\n");

    var strOut = " ";
    for (var i = 0; i < data.length, i++) {
        strOut = "";
        strOut += "Item ID: " + data[i].item_id + ' // ';
        strOut += "Product Name: " + data[i].product_name + ' // ';
        strOut += "Department: " + data[i].department_name + ' // ';
        strOut += "Price: $" + data[i].price + '\n';
        console.log(strOut);

    }

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