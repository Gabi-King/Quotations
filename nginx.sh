#!/bin/bash

# Remember to add "127.0.0.1 quotations.gabriel.paris" in /etc/hosts
# when project is in development to enable access via domain name and API requests.

FILES_PATH="/var/www/quotations.gabriel.paris"
LOGS_PATH="/var/log/nginx/quotations.gabriel.paris"
CONFIG_FILE_1="/etc/nginx/sites-available/quotations.gabriel.paris"
CONFIG_FILE_2="/etc/nginx/sites-enabled/quotations.gabriel.paris"

mkdir -p "$FILES_PATH"
cp -fr client/* "$FILES_PATH"

chown -R www-data:www-data "$FILES_PATH" "$FILES_PATH"/*
find "$FILES_PATH" -type d -exec chmod 755 {} \;
find "$FILES_PATH" -type f -exec chmod 644 {} \;

echo "Files ok"

mkdir -p "$LOGS_PATH"

if [ ! -f "$LOGS_PATH"/access.log ]; then
    touch "$LOGS_PATH"/access.log
fi
if [ ! -f "$LOGS_PATH"/error.log ]; then
    touch "$LOGS_PATH"/error.log
fi

chown -R root:root "$LOGS_PATH"
chmod 750 "$LOGS_PATH"
chmod 640 "$LOGS_PATH"/*

echo "Logs ok"

cp nginx.conf "$CONFIG_FILE_1"
ln -fs "$CONFIG_FILE_1" "$CONFIG_FILE_2"

chown -R root:root "$CONFIG_FILE_1" "$CONFIG_FILE_2"
chmod 644 "$CONFIG_FILE_1" "$CONFIG_FILE_2"

nginx -t

echo "Config ok"

systemctl reload nginx

echo "Process finished successfully."
