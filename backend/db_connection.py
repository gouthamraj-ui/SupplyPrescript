import mysql.connector

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Password",
    database="supply_prescript"
)

print("Database Connected!")

connection.close()
