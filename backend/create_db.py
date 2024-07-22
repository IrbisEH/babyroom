import os
from app.Managers.ConfigManager import ConfigManager
from app.Managers.LogManager import LogManager
from app.Managers.DbManager import DbManager
from app.DbModels import Base

from app.DbModels.TagModel import TagModel
from app.DbModels.ProductDbModel import ProductDbModel
from app.DbModels.UserModel import UserModel

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

def check_tables():
    defined_tables = Base.metadata.tables.keys()
    print(defined_tables)


if __name__ == '__main__':
    create_db()
    # check_tables()
