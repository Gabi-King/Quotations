#!/bin/bash

gunicorn -c gunicorn.conf.py \
    --certfile certificate/quotations_server-cert.pem --keyfile certificate/quotations_server-key.pem \
    app:app