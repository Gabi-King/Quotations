from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# MySQL database credentials
db_credentials = {
    "host": "localhost",
    "user": "root",
    "password": "nm6dyr!&rZmr&7q#EFh$",
    "database": "quotations",
}

@app.route("/api/quotations/get_stats", methods=["GET"])
def get_stats():
    try:
        connection = mysql.connector.connect(**db_credentials)
        cursor = connection.cursor(dictionary=True)

        query_quotations = "SELECT COUNT(*) FROM quotations;"
        cursor.execute(query_quotations)
        row_quotations = cursor.fetchone()
        count_quotations = row_quotations["COUNT(*)"]

        query_authors = "SELECT COUNT(*) FROM authors;"
        cursor.execute(query_authors)
        row_authors = cursor.fetchone()
        count_authors = row_authors["COUNT(*)"]

        data = f'{{"quotations_count": "{count_quotations}", "authors_count": "{count_authors}"}}'
        print(data)

        to_return = jsonify({"data": data})
        print(to_return)

    except mysql.connector.Error as error:
        to_return = jsonify({"error": error})

    finally:
        cursor.close()
        connection.close()
    
    return to_return

@app.route("/api/quotations/get_quotations_with_authors", methods=["GET"])
def get_quotations_with_authors():
    try:
        connection = mysql.connector.connect(**db_credentials)
        cursor = connection.cursor(dictionary=True)

        query = "SELECT * FROM quotations_with_authors;"
        cursor.execute(query)

        data = cursor.fetchall()

        to_return = jsonify({"data": data})

    except mysql.connector.Error as error:  
        to_return = jsonify({"error": error})


    finally:
        cursor.close()
        connection.close()
    
    return to_return

if __name__ == "__main__":
    app.run(debug=True)
