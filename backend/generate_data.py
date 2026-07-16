import pandas as pd
from faker import Faker
import random
import os

fake = Faker("en_IN")

# Create data folder if it doesn't exist
os.makedirs("data", exist_ok=True)

# -----------------------------
# Generate Suppliers Data
# -----------------------------
suppliers = []

for i in range(1, 21):
    suppliers.append({
        "supplier_id": i,
        "supplier_name": fake.company(),
        "city": fake.city(),
        "lead_time": round(random.uniform(1.0, 10.0), 2),
        "rating": round(random.uniform(3.5, 5.0), 2)
    })

suppliers_df = pd.DataFrame(suppliers)

suppliers_df.to_csv("data/suppliers.csv", index=False)

print("✅ suppliers.csv created successfully!")
print(suppliers_df.head())

# -----------------------------
# Generate Products Data
# -----------------------------
products = []

categories = [
    "Electronics",
    "Furniture",
    "Groceries",
    "Clothing",
    "Medical",
    "Automotive"
]

for i in range(1, 151):
    products.append({
        "product_id": i,
        "product_name": fake.word().title() + " Product",
        "category": random.choice(categories),
        "unit_price": round(random.uniform(100, 5000), 2),
        "supplier_id": random.randint(1, 20)
    })

products_df = pd.DataFrame(products)

products_df.to_csv("data/products.csv", index=False)

print("\n✅ products.csv created successfully!")
print(products_df.head())

# -----------------------------
# Generate Shipments Data
# -----------------------------
shipments = []

shipment_status = [
    "In Transit",
    "Delivered",
    "Delayed",
    "Cancelled"
]

for i in range(1, 4001):

    shipment_date = fake.date_between(start_date="-2y", end_date="today")
    expected_arrival = shipment_date + pd.Timedelta(days=random.randint(2, 10))
    actual_arrival = expected_arrival + pd.Timedelta(days=random.randint(-2, 5))

    shipments.append({
        "shipment_id": i,
        "supplier_id": random.randint(1, 20),
        "product_id": random.randint(1, 150),
        "shipment_date": shipment_date,
        "expected_arrival": expected_arrival,
        "actual_arrival": actual_arrival,
        "quantity": random.randint(10, 500),
        "shipment_status": random.choice(shipment_status)
    })

shipments_df = pd.DataFrame(shipments)

shipments_df.to_csv("data/shipments.csv", index=False)

print("✅ shipments.csv created successfully!")
print(shipments_df.head())

#----------------------
#Inventory data
#---------------------
inventory = []

warehouses = [
    "Hyderabad Warehouse",
    "Mumbai Warehouse",
    "Chennai Warehouse",
    "Bangalore Warehouse",
    "Delhi Warehouse"
]

for i in range(1, 151):
    inventory.append({
        "inventory_id": i,
        "product_id": i,
        "warehouse": random.choice(warehouses),
        "stock_quantity": random.randint(50, 1000),
        "last_updated": fake.date_between(start_date="-30d", end_date="today")
    })

inventory_df = pd.DataFrame(inventory)

inventory_df.to_csv("data/inventory.csv", index=False)

print("✅ inventory.csv created successfully!")
print(inventory_df.head())

#-----------------------------
#orders data
#-----------------------------
orders = []

order_status = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Delivered",
    "Cancelled"
]

for i in range(1, 5001):

    order_date = fake.date_between(start_date="-2y", end_date="today")
    expected_delivery = order_date + pd.Timedelta(days=random.randint(2, 15))

    orders.append({
        "order_id": i,
        "supplier_id": random.randint(1, 20),
        "product_id": random.randint(1, 150),
        "order_date": order_date,
        "quantity": random.randint(5, 300),
        "expected_delivery": expected_delivery,
        "order_status": random.choice(order_status)
    })

orders_df = pd.DataFrame(orders)

orders_df.to_csv("data/orders.csv", index=False)

print("✅ orders.csv created successfully!")
print(orders_df.head())

#------------------------
#disruption data
#-----------------------

disruptions = []

types = [
    "Weather",
    "Supplier Delay",
    "Machine Failure",
    "Transport Strike",
    "Traffic",
    "Port Congestion"
]

severity = [
    "Low",
    "Medium",
    "High"
]

for i in range(1, 601):
    disruptions.append({
        "disruption_id": i,
        "shipment_id": random.randint(1, 4000),
        "disruption_type": random.choice(types),
        "severity": random.choice(severity),
        "description": fake.sentence(),
        "reported_date": fake.date_between(start_date="-1y", end_date="today")
    })

disruptions_df = pd.DataFrame(disruptions)

disruptions_df.to_csv("data/disruptions.csv", index=False)

print("✅ disruptions.csv created successfully!")
print(disruptions_df.head())

#---------------------
#Decisions Data
#---------------------
decisions = []

recommended = [
    "Switch Supplier",
    "Expedite Shipment",
    "Increase Safety Stock",
    "Change Transport Route"
]

taken = [
    "Approved",
    "Rejected",
    "Implemented",
    "Pending"
]

for i in range(1, 601):
    decisions.append({
        "decision_id": i,
        "disruption_id": i,
        "recommended_action": random.choice(recommended),
        "action_taken": random.choice(taken),
        "decision_date": fake.date_between(start_date="-1y", end_date="today")
    })

decisions_df = pd.DataFrame(decisions)

decisions_df.to_csv("data/decisions.csv", index=False)

print("✅ decisions.csv created successfully!")
print(decisions_df.head())

#--------------------------
#outcomes Data
#--------------------------
outcomes = []

status = [
    "Resolved",
    "Partially Resolved",
    "Pending",
    "Failed"
]

remarks = [
    "Issue resolved successfully",
    "Minor delay occurred",
    "Cost increased",
    "Supplier changed",
    "Shipment rerouted"
]

for i in range(1, 601):
    outcomes.append({
        "outcome_id": i,
        "decision_id": i,
        "outcome_status": random.choice(status),
        "delay_days": random.randint(0, 15),
        "cost_change": round(random.uniform(-5000, 15000), 2),
        "remarks": random.choice(remarks)
    })

outcomes_df = pd.DataFrame(outcomes)

outcomes_df.to_csv("data/outcomes.csv", index=False)

print("✅ outcomes.csv created successfully!")
print(outcomes_df.head())