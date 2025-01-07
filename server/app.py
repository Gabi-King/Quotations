import os
from flask import Flask, jsonify, request, redirect
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import mysql.connector
from pathlib import Path

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

DB = {
    "host": os.getenv("MYSQL_HOST", "localhost"),
    "database": os.getenv("MYSQL_NAME", "quotations"),
    "user": os.getenv("MYSQL_USER", "user"),
    "password": os.getenv("MYSQL_PASSWORD", "password"),
    "ssl_disabled": os.getenv("MYSQL_SSL_DISABLED", "False").lower() == "true",
}


@app.route("/api/get_stats", methods=["GET"])
@cross_origin()
def get_stats():
    connection = None
    cursor = None
    
    try:
        connection = mysql.connector.connect(**DB)
        cursor = connection.cursor(dictionary=True)
        
        query_quotations = "SELECT COUNT(*) FROM quotations;"
        cursor.execute(query_quotations)
        row_quotations = cursor.fetchone()
        count_quotations = row_quotations["COUNT(*)"]
        
        query_authors = "SELECT COUNT(*) FROM authors;"
        cursor.execute(query_authors)
        row_authors = cursor.fetchone()
        count_authors = row_authors["COUNT(*)"]
        
        response = jsonify({
            "data": {
                "quotations_count": count_quotations,
                "authors_count": count_authors
            }
        })
    
    except mysql.connector.Error as error:
        response = jsonify({"error": str(error)})
    
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()
    
    return response


@app.route("/api/get_quotations_with_authors", methods=["GET"])
@cross_origin()
def get_quotations_with_authors():
    connection = None
    cursor = None
    
    try:
        connection = mysql.connector.connect(**DB)
        cursor = connection.cursor(dictionary=True)
        
        query = "SELECT * FROM quotations_with_authors;"
        cursor.execute(query)
        
        data = cursor.fetchall()
        
        response = jsonify({"data": data})
    
    except mysql.connector.Error as error:
        response = jsonify({"error": str(error)})
    
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()
    
    return response


@app.route("/api/search_quotations", methods=["GET"])
@cross_origin()
def search_quotations():
    connection = None
    cursor = None
    
    try:
        connection = mysql.connector.connect(**DB)
        cursor = connection.cursor(dictionary=True)
        
        phrase = request.args.get("phrase")
        
        query = "SELECT * FROM quotations_with_authors WHERE quotation LIKE %s"
        cursor.execute(query, ('%' + phrase + '%',))
        
        data = cursor.fetchall()
        
        response = jsonify({"data": data})
    
    except mysql.connector.Error as error:
        response = jsonify({"error": str(error)})
    
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()
            
    return response


if __name__ == "__main__":
    app.run(debug=True, port=5000)
