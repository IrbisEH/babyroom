
### запуск uwsgi
/var/www/html/babyroom/backend/venv/bin/uwsgi --ini /var/www/html/babyroom/backend/uwsgi.ini

### просмотр журнала в реалтайм
journalctl -u babyroom -f