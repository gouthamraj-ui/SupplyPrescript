-- =========================================================
-- SupplyPrescript SQL Queries
-- =========================================================

-- 1. Supplier Count
SELECT COUNT(*) AS total_suppliers
FROM suppliers;


-- 2. Sample Suppliers
SELECT *
FROM suppliers
LIMIT 5;


-- 3. Products for Supplier
SELECT *
FROM products
WHERE supplier_id = 1;


-- 4. Shipment + Supplier + Product
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


-- 5. Delayed Shipments
SELECT
    shipment_id,
    DATEDIFF(actual_arrival, expected_arrival) AS delay_days
FROM shipments
WHERE actual_arrival > expected_arrival;


-- 6. Average Supplier Delay
SELECT
    s.supplier_name,
    AVG(
        DATEDIFF(
            actual_arrival,
            expected_arrival
        )
    ) AS avg_delay
FROM shipments sh
JOIN suppliers s
    ON sh.supplier_id = s.supplier_id
GROUP BY s.supplier_name;


-- 7. Suppliers With Average Delay > 3 Days
WITH supplier_delay AS (
    SELECT
        supplier_id,
        AVG(
            DATEDIFF(
                actual_arrival,
                expected_arrival
            )
        ) AS avg_delay
    FROM shipments
    GROUP BY supplier_id
)
SELECT *
FROM supplier_delay
WHERE avg_delay > 3;


-- 8. Supplier Delay Ranking
SELECT
    supplier_id,
    AVG(
        DATEDIFF(
            actual_arrival,
            expected_arrival
        )
    ) AS avg_delay,
    RANK() OVER (
        ORDER BY AVG(
            DATEDIFF(
                actual_arrival,
                expected_arrival
            )
        )
    ) AS supplier_rank
FROM shipments
GROUP BY supplier_id;