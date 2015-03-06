#!/usr/bin/env bash

apt-get update
apt-get install -y apache2
if ![-L /var/www]; then
	rm -rf /var/www
	ln -fs /vagrant /var/www
fi

apt-get install -y lamp-server^

libapache2-mod-php5
sudo a2enmod php5
sudo service apache2 restart
mysql-server libapache2-mod-auth-mysql php5-mysql
mysql -u root