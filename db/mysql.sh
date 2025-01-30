#!/bin/bash

source ../.env

mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $MYSQL_NAME;"

mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD"  "$MYSQL_NAME" < latest.sql
