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









### Screenshots Of Application

#### Create Database
<img src="screenshots/sql.png" width="600">

#### bamazonCustomer.js
<img src="screenshots/customerinsufficient.png" width="600">
<img src="screenshots/customerordercomplete.png" width="600">

#### bamazonManager.js
<img src="screenshots/managerselect.png" width="600">
<img src="screenshots/managerlow.png" width="600">

#### SQL
##### Products Table
<img src="screenshots/sql_productsTable.png" width="600">
<img src="screenshots/sql_products.png" width="600">

##### Departments Table
<img src="screenshots/sql_departmentTable.png" width="600">
<img src="screenshots/sql_departments.png" width="600">