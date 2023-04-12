#!/bin/sh
set -e

APP_ENV=${APP_ENV:-prod}
NGINX_HTTP_PORT=${NGINX_HTTP_PORT:-80}

sed -e "s|%NGINX_HTTP_PORT%|$NGINX_HTTP_PORT|" -i /etc/nginx/sites-enabled/*.conf

supervisorctl start node
supervisorctl start nginx
