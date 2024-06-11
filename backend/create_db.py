import os
from app.Managers.ConfigManager import ConfigManager
from app.Managers.LogManager import LogManager
from app.Managers.DbManager import DbManager
from app.Models import Base
from app.Models.UserModel import UserModel
from app.Models.ProductModel import ProductModel


DIR = os.path.dirname(__file__)

config = ConfigManager(DIR)
log = LogManager(config)
db = DbManager(config, log)

def create_db():
    try:
        Base.metadata.create_all(db.engine)
        log.info("Database created")
    except Exception as e:
        log.error(e)


if __name__ == '__main__':
    create_db()
