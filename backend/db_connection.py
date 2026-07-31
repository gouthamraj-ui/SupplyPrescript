import mysql.connector


def get_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="nareshit",
        database="supply_prescript"
    )
    
    return connection