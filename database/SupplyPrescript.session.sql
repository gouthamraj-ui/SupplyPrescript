-- Active: 1784284622682@@127.0.0.1@3306
Select * from suppliers

SELECT COUNT(*) AS total_suppliers
FROM suppliers;

SELECT COUNT(*) FROM suppliers;
SELECT * FROM suppliers LIMIT 5;
SELECT *from products where supplier_id = 1;

SELECT
    sh.shipment_id,
    s.supplier_name,
    p.product_name,
    sh.quantity,
    sh.shipment_status
FROM shipments sh
JOIN suppliers s
ON sh.supplier_id = s.supplier_id
JOIN products p
ON sh.product_id = p.product_id;

SELECT
shipment_id,
DATEDIFF(actual_arrival, expected_arrival) AS delay_days
FROM shipments
WHERE actual_arrival > expected_arrival;

SELECT
s.supplier_name,
AVG(DATEDIFF(actual_arrival, expected_arrival)) AS avg_delay
FROM shipments sh
JOIN suppliers s
ON sh.supplier_id=s.supplier_id
GROUP BY s.supplier_name;

WITH supplier_delay AS
(
SELECT
supplier_id,
AVG(DATEDIFF(actual_arrival,expected_arrival)) avg_delay
FROM shipments
GROUP BY supplier_id
)

SELECT *
FROM supplier_delay
WHERE avg_delay>3;

SELECT
supplier_id,
AVG(DATEDIFF(actual_arrival,expected_arrival)) avg_delay,
RANK() OVER
(
ORDER BY AVG(DATEDIFF(actual_arrival,expected_arrival))
)
AS supplier_rank
FROM shipments
GROUP BY supplier_id;

SELECT * from suppliers;
SELECT * from products;

