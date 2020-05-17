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

connection.connect(function(err) {
    if (err) throw err;
    products();
});

function promptManagerAction() {

    //prompt manager to selet an option
    inquirer.prompt([
        {
        type: "list",
        name: "option",
        message: "Select an option:\n",
        choices: ["View Products for Sale", "View Low Inventory",  "Add to Inventory", "Add New Product"],
        filter: function(val) {
            if (val === "View Products for Sale") {
                return "sale";
            }else if (val === "View Low Inventory") {
                return "lowInventory";
            }else if (val === "Add to Inventory") {
                return "addInventory";
            }else if (val === "Add New Product") {
                return "newProduct";
            }else {
                console.log("ERROR: Unsupported operation!");
                exit(1);
                
            }
        }
    }
]).then(function(input) {
    if(input.option === "sale") {
        displayInventory();
    } else if (input.option === "lowInventory") {
        displayLowInventory();
    } else if (input.option === "addInventory") {
        addInventory();
    }else if (input.option === "newProduct") {
        createNewProduct();
    }else{
        console.log("ERROR: Unsupported operation!");
        exit(1);
    }
})
}

// Inventory: retrieve the current inventory from the database and output 
function displayInventory() {
    queryStr = "SELECT * FROM products";
    connection.query(queryStr, function(err, data) {
        if (err) throw err;

        console.log("Existing Inventory: ");
        console.log(".........................\n");

        var strOut = "";
        for (var i = 0; i < data.length; i ++) {
        
            strOut = "";
            strOut += "Item ID: " + data[i].item_id + ' // ';
            strOut += "Product Name: " + data[i].product_name + ' // ';
            strOut += "Department: " + data[i].department_name + ' // ';
            strOut += "Price: $" + data[i].price + ' // ';
            strOut += "Quantity: " + data[i].stock_quantity + '\n';
            console.log(strOut);

         }
        console.log("----------------------------------------------\n");
        connection.end();
        })
}

// Low Inventory: display a list of products with the available quantity when below 100
function displayLowInventory() {
    queryStr = "SELECT * FROM products WHERE stock_quantity < 100";
    connection.query(queryStr, function(err, data) {
        if (err) throw err;

        console.log("Low Inventory Items (below 100): ");
        console.log("................................\n");

        var strOut = "";
        for (var i = 0; i < data.length; i ++) {
            strOut = "";
            strOut += "Item ID: " + data[i].item_id + ' // ';
            strOut += "Product Name: " + data[i].product_name + ' // ';
            strOut += "Department: " + data[i].department_name + ' // ';
            strOut += "Price: $" + data[i].price + ' // ';
            strOut += "Quantity: " + data[i].stock_quantity + '\n';
            console.log(strOut);
        }
        console.log("----------------------------------------------\n");
        connection.end();
    })
}

// validate Integer
function validateInteger(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return "Please enter a whole number";
    }
}

// supply only positive numbers for their inputs
function validateNumeric(value) {
    var number = (typeof parseFloat(value)) === "number";
    var positive = parseFloat(value) > 0;

    if (number && positive) {
        return true;
    }else{
        return "Enter a positive number for the unit price here."
    }
}

// Add Inventory: user will add to existing item
function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            message: "Enter the Item ID for stock_count update",
            validate: validateInteger,
            filter: Number
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to add?",
            validate: validateInteger,
            filter: Number
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
function createNewProduct() {
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
    promptManagerAction();
}
runBamazon();
