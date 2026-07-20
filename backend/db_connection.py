import mysql.connector

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="nareshit",
    database="supply_prescript"
)

print("Database Connected!")

connection.close()
