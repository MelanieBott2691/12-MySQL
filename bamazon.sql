CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products (
     item_id INT AUTO_INCREMENT PRIMARY KEY,
     product_name VARCHAR(100) NOT NULL,
     department_name VARCHAR(100) NOT NULL,
     price DECIMAL(10, 2) NOT NULL,
     stock_quantity INT(10) NOT NULL,
     PRIMARY KEY(item_id)
);

DESCRIBE products;

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('Mechanical Pencil', 'Office Products', 4.99, 250),
('Notepad', 'Office Products', 2.99, 300),
('Stapler', 'Office Products', 12.99, 325),
('Ruler', 'Office Products', 1.99, 400),
('Detergent', 'Grocery', 11.99, 200),
('Mixed Nuts', 'Grocery', 14.99, 290),
('Toilet Paper', 'Grocery', 49.99, 190),
('Clorox Wipes', 'Grocery', 19.99, 120),
('Hand Sanitizer', 'Grocery', 11.99, 110),
('Maxi Skirt', 'Clothing', 24.99, 120),
('Levi High Rise Skinny Jeans', 'Clothing', 39.99, 220),
('6-Pack Baby Girl Bodysuit', 'Clothing', 17.99, 320),
('Burts Bees Baby Sleep and Play', 'Clothing', 21.92, 190),
('Gallon Lawn Sprayer', 'Home & Garden', 19.75, 200),
('Waterproof Garden Gloves', 'Home & Garden', 14.95, 180),
('Garden Sprinkler', 'Home & Garden', 19.99, 190),
('Barrel Planter', 'Home & Garden', 25.95, 250);

SELECT * FROM products;

USE bamazon;

CREATE TABLE departments (
	department_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	department_name TEXT NOT NULL,
	over_head_costs DECIMAL (10,4) NOT NULL,
	product_sales VARCHAR (6)
	);

UPDATE departments
SET over_head_costs
WHERE DECIMAL (10, 2);

DESCRIBE departments;

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Office Products', 800),
('Grocery', 4000),
('Clothing', 4000),
('Home & Garden', 8000);

SELECT * FROM departments;

