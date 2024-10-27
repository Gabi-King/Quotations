import ssl
import os
from flask import Flask, jsonify, request, redirect
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import mysql.connector
from pathlib import Path

# Load environment variables from the root .env file
load_dotenv(Path(__file__).resolve().parents[1] / ".env")

app = Flask(__name__)
CORS(app, resources={r"/api/quotations/*": {"origins": "*"}}, supports_credentials=True)

ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
ssl_context.load_cert_chain(
    certfile="certificate/quotations_server-cert.pem",
    keyfile="certificate/quotations_server-key.pem"
)

# MySQL database credentials from environment variables
DB = {
    "host": os.getenv("DB_HOST", "localhost"),
    "database": os.getenv("DB_NAME", "quotations"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", "password"),
    "ssl_ca": "certificate/quotations_server-cert.pem",
    "ssl_disabled": os.getenv("DB_SSL_DISABLED", "False").lower() == "true",
}


@app.before_request
def before_request():
    if not request.is_secure:
        return redirect(request.url.replace("http://", "https://"))


@app.route("/api/quotations/get_stats", methods=["GET"])
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
        
        data = f'{{"quotations_count": "{count_quotations}", "authors_count": "{count_authors}"}}'
        response = jsonify({"data": data})
    
    except mysql.connector.Error as error:
        response = jsonify({"error": str(error)})
    
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()
    
    return response


@app.route("/api/quotations/get_quotations_with_authors", methods=["GET"])
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


@app.route("/api/quotations/search_quotations", methods=["GET"])
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
    app.run(debug=True, ssl_context=ssl_context, port=5000)
