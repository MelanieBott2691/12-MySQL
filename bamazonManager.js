// Challenge #2: Manager View (Next Level)

// Call for dependencies 
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
// SETUP
// ==========================================================================================
connection.connect((err) => {
    if (err) throw err;
    console.log('Connection successful!');
    resetData();
    displayMenu();
});
// FUNCTIONS
// ==========================================================================================

var resetData = function() {
    console.log("lets get this party started")
    };

//prompt manager to selet an option
var displayMenu = function() {
    inquirer.prompt({
        type: "list",
        name: "option",
        message: "Select an option:\n",
        choices: [
            "View Products for Sale", 
            "View Low Inventory",  
            "Add to Inventory", 
            "Add New Product"
        ],
}).then((answer) => {
    switch (answer.action) {
        case 'View Products for Sale':
            viewProductsSale();
            console.log("View Products for Sale!!!!!!!! Please");
            break;
        case 'View Low Inventory':
            viewLowInventory();
            break;
        case 'Add to Inventory':
            addInventory();
            break;
        case 'Add New Product':
            addNewProduct();
            break;
        }
    });
};

var viewProductsSale = function() {
    connection.query('SELECT * FROM products', (err, res) => {
    for (var i = 0; i < res.length; i++) {
            console.log([res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
            console.log("--------------------------------------------------------")
        }
        connection.end();
    });
    };
    // Inventory: retrieve the current inventory from the database and output 
    var viewLowInventory = function() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 100', (err, res) => {
    for (var i = 0; i < res.length; i++) {
    console.log('Inventory: ' + res[i].stock_quantity + 'Product Name: ' + res[i].product_name);
    }
    connection.end();
    });
    };
    
    // Add Inventory: user will add to existing item
    function addInventory() {
        inquirer.prompt([
            {
                type: "input",
                name: "item_id",
                message: "Enter the Item ID for stock_count update",
                validate: validateInteger,
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to add?",
                validate: validateInteger,
            }
        ]).then(function(input) {
            var item = input.item_id;
            var addQuantity = input.quantity;
            var queryStr = "SELECT * FROM products WHERE ?";
           
            connection.query(queryStr, {item_id: item}, function(err, data) {
                if (err) throw err;
    
                if (data.length === 0) {
                    console.log("ERROR: Invalid Item ID");
                    addInventory();
                } else {
                    var productData = data[0];
                    console.log("Updating Inventory...");
    
                    var updateQueryStr = "UPDATE products SET stock_quantity = " + (productData.stock_quantity + addQuantity) + " WHERE item_id = " + item;
                connection.query(updateQueryStr, function(err, data) {
                    if (err) throw err;
    
                    console.log("Stock count for Item ID " + item + "has been update to " + (productData.stock_quantity + addQuantity) + ".");
                    console.log("\n---------------------------------------------------\n");
    
                    connection.end();
                })
                }
            })
        })
    }
    
    // Create New Product to add new product to inventory
    function addNewProduct() {
        inquirer.prompt([
            {
                type: "input",
                name: "product_name",
                message: "Enter the new product name."
            },
            {
                type: "input",
                name: "department_name",
                message: "Which department does the product belong to?",
            },
            {
                type: "input",
                name: "price",
                message: "What is the price per unit?",
                validate: validateNumeric
            },
            {
                type: "input",
                name: "stock_quantity",
                message: "How many items are in stock?",
                validate: validateInteger
            }
        ]).then(function(input) {
            console.log("Adding New Item: \n product_name " + input.product_name + "\n" + ' department_name ' + input.department_name + '\n' + ' price = ' + input.price + '\n' + ' stock_quantity = ' + input.stock_quantity);
        
        var queryStr = "INSERT INTO products SET ?";
    
        connection.query(queryStr, input, function (error, results, fields) {
            if (error) throw error;
    
            console.log("New product has been added to the inventory" + results.insertId + '.');
            console.log("\n----------------------------------------------------------------\n");
            connection.end();
        });
        
        })
    }
    function runBamazon() {
        displayMenu();
    }
    runBamazon();
