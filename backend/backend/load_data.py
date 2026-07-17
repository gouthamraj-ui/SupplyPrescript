import mysql.connector
import pandas as pd

# Connect to MySQL
connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="nareshit",
    database="supply_prescript"
)

cursor = connection.cursor()

print("✅ Connected to MySQL")

def load_csv(csv_file, table_name, columns):
    df = pd.read_csv(csv_file)

    placeholders = ", ".join(["%s"] * len(columns))
    column_names = ", ".join(columns)

    query = f"""
        INSERT INTO {table_name}
        ({column_names})
        VALUES ({placeholders})
    """

    for _, row in df.iterrows():
        cursor.execute(query, tuple(row[col] for col in columns))

    connection.commit()

    print(f"✅ {table_name} loaded ({len(df)} rows)")

# loading tables
#products
load_csv(
    "data/products.csv",
    "products",
    [
        "product_id",
        "product_name",
        "category",
        "unit_price",
        "supplier_id"
    ]
)
#shipments
load_csv(
    "data/shipments.csv",
    "shipments",
    [
        "shipment_id",
        "supplier_id",
        "product_id",
        "shipment_date",
        "expected_arrival",
        "actual_arrival",
        "quantity",
        "shipment_status"
    ]
)
#Inventory
load_csv(
    "data/inventory.csv",
    "inventory",
    [
        "inventory_id",
        "product_id",
        "warehouse",
        "stock_quantity",
        "last_updated"
    ]
)
#Orders
load_csv(
    "data/orders.csv",
    "orders",
    [
        "order_id",
        "supplier_id",
        "product_id",
        "order_date",
        "quantity",
        "expected_delivery",
        "order_status"
    ]
)
#Disruption
load_csv(
    "data/disruptions.csv",
    "disruptions",
    [
        "disruption_id",
        "shipment_id",
        "disruption_type",
        "severity",
        "description",
        "reported_date"
    ]
)
#Decision
load_csv(
    "data/decisions.csv",
    "decisions",
    [
        "decision_id",
        "disruption_id",
        "recommended_action",
        "action_taken",
        "decision_date"
    ]
)
#Outcomes
load_csv(
    "data/outcomes.csv",
    "outcomes",
    [
        "outcome_id",
        "decision_id",
        "outcome_status",
        "delay_days",
        "cost_change",
        "remarks"
    ]
)
cursor.close()
connection.close()

print(" All CSV files loaded successfully!")
