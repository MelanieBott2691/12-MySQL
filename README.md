# 12-MySQL

## Node.js & MySQL

### Overview
- This CLI App takes in orders from customers and depletes stock from the store's inventory similar to an Amazon-like storefront using MySQL.
- The app tracks product sales across the store's departments and provides a summary of the highest-grossing departments in the store.

### Instructions
1. Create a MySQL Database call bamazon
2. Create a Table inside of the database called products
3. The products table should have each of the following columns:
- item_id (unique id for each product)
- product_name (Name of product)
- department_name
- price (cost of customer)
- stock_quantity (how much of the product is available in stores)
4. Populate the database with around 10 different products (i.e. insert "mock" data rows into this database and table)
5. Create a node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.









#### Screenshots through the application

##### Create Database
![](screenshots/customerinsufficient.png)

##### Customer.js
<img src="/screenshots/customerinsufficient.png" width="400">
<img src="/screenshots/customerordercomplete.png" width="400">
