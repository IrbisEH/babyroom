import os
from app.Managers.ConfigManager import ConfigManager
from app.Managers.LogManager import LogManager
from app.Managers.DbManager import DbManager
from app.DbModels.UserModel import UserModel
from app.Managers.ProductManager import ProductManager


DIR = os.path.dirname(os.path.abspath(__file__))

config = ConfigManager(DIR)
log = LogManager(config)
db = DbManager(config, log)

manager = ProductManager(config, log)

data = manager.get()

print(data.data)