USE employeeDB;

INSERT INTO department (department_name)
VALUES ("Sales"),("Accounting"), ("Warehouse"),("Product Oversight");

INSERT INTO role (title, salary, department_id)
VALUES ("Inside Sales Rep", 75000, 1), ("Traveling Sales Rep", 85000, 1), ("Regional Director of Sales", 150000, 1),("Senior Accountant", 110000, 2), ("Accountant", 90000, 2), ("Warehouse Foreman", 95000, 3), ("Fork Lift Operator", 60000, 3), ("Customer Service Rep", 65000, 4), ("Supplier Relations", 65000, 4), ("Quality Assurance", 60000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1, null), ("Jim", "Halpert", 1, 1), ("Oscar", "Martinez", 3, 1), ("Dwight", "Schrute", 4, null), ("Joe", "Dirt", 5, 4);

Select * FROM department;
Select * FROM role;
SELECT * FROM employee;