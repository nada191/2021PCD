import cx_Oracle

cx_Oracle.init_oracle_client(lib_dir=r"C:\Users\nourhene\Desktop\FlaskTry\instantclient_19_10")

connection = cx_Oracle.connect("site1", "site1", "DESKTOP-87LLS24:1521/orcl")

print("Successfully connected to Oracle Database")

cursor = connection.cursor()

for row in cursor.execute("select * from medicament"):
    print(row)
