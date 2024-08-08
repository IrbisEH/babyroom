import os

from app_py.Managers.ConfigManager import ConfigManager
from app_py.Managers.LogManager import LogManager
from app_py.Managers.DbManager import DbManager

DIR = os.path.dirname(__file__)

config = ConfigManager(DIR)
log = LogManager(config)
db = DbManager(config, log)

if __name__ == '__main__':
    db.connect()
    db.check_connection()
    db.drop_tables()
    db.create_tables()
    db.disconnect()