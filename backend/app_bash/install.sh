#!/bin/bash

# FOR DEVELOP VERSION!

DB_NAME="babyroom"
DB_USER="admin"
DB_PASS="babyroom"
DB_PORT="3306"
FILE_CONF_PATH="/etc/mysql/mysql.conf.d/mysqld.cnf"
BIND_ADDRESS="0.0.0.0"

APP_PATH="/var/www/html/babyroom"
BACKEND_PATH="$APP_PATH/backend"
INFRA_PATH="$BACKEND_PATH/infra"

#sudo apt update -y
#sudo apt upgrade -y
#
#sudo apt install -y net-tools
#sudo apt-get install -y build-essential checkinstall
#sudo apt-get install -y libncursesw5-dev libssl-dev \
#    libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev zlib1g-dev
#sudo apt-get install -y python3-dev
#sudo apt install -y mysql-server
#sudo apt install -y nginx
#
##sudo ufw allow 'Nginx Full'
#
## RENEW APP DIR
#if [ -d $APP_PATH ]; then
#  sudo rm -rf $APP_PATH
#fi
#
#sudo mkdir -p $APP_PATH
#sudo chmod -R 777 $APP_PATH

## CONFIGURE REMOTE ACCESS
#sudo sed -i "s/^bind-address.*/bind_address=${BIND_ADDRESS}/" $FILE_CONF_PATH
#sudo systemctl restart mysql

#sudo systemctl restart mysql.service
#sudo ufw allow from any to any port $DB_PORT

# CREATE DB
#sudo mysql -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"
#sudo mysql -e "CREATE USER IF NOT EXISTS '$DB_USER'@'%' IDENTIFIED BY '$DB_PASS';"
#sudo mysql -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'%' WITH GRANT OPTION;"
#sudo mysql -e "FLUSH PRIVILEGES;"

## IF DNS SERVER LOST
## sudo nano /etc/resolv.conf
## nameserver 8.8.8.8
## nameserver 8.8.4.4
## sudo systemctl restart systemd-resolved.service

#python venv
#sudo apt install -y python3-venv
#python3 -m venv "$BACKEND_PATH/venv"
#source "$BACKEND_PATH/venv/bin/activate"
#pip install -r "$BACKEND_PATH/requirements.txt "
#deactivate

#sudo mv "$INFRA_PATH/babyroom.service" "/etc/systemd/system/babyroom.service"
#sudo systemctl start babyroom
#sudo systemctl enable babyroom

# check if exist delete
#sudo mv "/var/www/html/babyroom/backend/infra/nginx/babyroom" "/etc/nginx/sites-available/babyroom"
#sudo ln -s /etc/nginx/sites-available/babyroom /etc/nginx/sites-enabled/
#sudo nginx -t
#sudo systemctl reload nginx
#sudo systemctl restart nginx


#commands to help run
#sudo chown -R www-data:www-data /var/www/html/babyroom/backend
#sudo chmod -R 755 /var/www/html/babyroom/backend
#uwsgi --ini uwsgi.ini

#npm build star
#start": "react-scripts --openssl-legacy-provider start",
#"build": "react-scripts build",

#sudo rm /etc/nginx/sites-enabled/babyroom
#ls -l /etc/nginx/sites-enabled/
#mv /var/www/html/babyroom/backend/infra/nginx/babyroom /etc/nginx/sites-available/babyroom
#sudo ln -s /etc/nginx/sites-available/babyroom /etc/nginx/sites-enabled/
#sudo nginx -t
#sudo systemctl reload nginx
