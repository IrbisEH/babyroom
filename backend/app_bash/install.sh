#!/bin/bash

# FOR DEVELOP VERSION!

DB_NAME="babyroom"
DB_USER="admin"
DB_PASS="babyroom"
DB_PORT="3306"
FILE_CONF_PATH="/etc/mysql/mysql.conf.d/mysqld.cnf"
BIND_ADDRESS="0.0.0.0"

APP_PATH="/var/www/html/babyroom"
STATIC_DIR="/static"

sudo apt update
sudo apt upgrade
sudo apt install net-tools

# установка сервера
sudo apt install nginx

# RENEW APP DIR
if [ -d $APP_PATH ]; then
  sudo rm -rf $APP_PATH
fi

sudo mkdir -p $APP_PATH
sudo chmod -R 777 $APP_PATH

sudo mkdir -p $APP_PATH$STATIC_DIR
sudo chmod -R 777 $APP_PATH$STATIC_DIR

# update os
sudo apt update -y
sudo apt upgrade -y
sudo apt install -y mysql-server

# CONFIGURE REMOTE ACCESS
sudo sed -i "s/^bind-address.*/bind_address=${BIND_ADDRESS}/" $FILE_CONF_PATH
sudo systemctl restart mysql

#sudo systemctl restart mysql.service
sudo ufw allow from any to any port $DB_PORT

# CREATE DB
sudo mysql -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"
sudo mysql -e "CREATE USER IF NOT EXISTS '$DB_USER'@'%' IDENTIFIED BY '$DB_PASS';"
sudo mysql -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'%' WITH GRANT OPTION;"
sudo mysql -e "FLUSH PRIVILEGES;"

# IF DNS SERVER LOST
# sudo nano /etc/resolv.conf
# nameserver 8.8.8.8
# nameserver 8.8.4.4
# sudo systemctl restart systemd-resolved.service
