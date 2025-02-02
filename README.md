# Quotations

Quotations is a website that lists famous quotes from famous authors. These quotes are stored in a MySQL database and accessed by a Flask API. The whole is behind a Nginx reverse proxy.

## Features

- Display dozens of quotes from dozens of authors.
- Search keywords in the database of quotes.

## Structure

- Client: Nginx web server
- Server: Flask API, Gunicorn WSGI server, Nginx reverse proxy
- Database: MySQL

## Requirements

- [Nginx](https://nginx.org/en/download.html)
- [Python3](https://www.python.org/downloads/)
- [MySQL](https://dev.mysql.com/downloads/)

## Install

- Clone repository
    ```bash
    git clone https://gitlab.com/GabiKing-Corp/Website/Quotations.git
    cd Quotations
    ```

- Recreate .env file with following variables
    ```text
    nano .env
    MYSQL_NAME="quotations"
    MYSQL_USER="user"
    MYSQL_PASSWORD="password"
    MYSQL_ROOT_PASSWORD="password"
    MYSQL_SSL_DISABLED="false"
    ```

- Initialize Nginx
    ```bash
    sudo ./nginx.sh
    ```

- Create python venv
    ```bash
    python3 -m venv .venv
    pip install -r server/requirements.txt
    ```

- Initialize server
    ```bash
    cd server
    ./gunicorn.sh
    ```

- Initialize database
    ```bash
    cd ../db
    ./mysql.sh
    ```

## Contribution

Thanks to :
- Myself to have made all the work
- My brain to have the idea of this project
- My keyboard to support all my hard times
- And more importantly all the open-source community that developed all the libraries this project use !

## Licence

This project is under MIT licence. Please consult [LICENSE](LICENSE) file for more information.
