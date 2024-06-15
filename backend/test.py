import os
from app.Managers.ConfigManager import ConfigManager
from app.Managers.LogManager import LogManager
from app.Managers.DbManager import DbManager
from app.Managers.ResultManager import GetOk, GetError
from app.Models.UserModel import UserModel


DIR = os.path.dirname(os.path.abspath(__file__))

config = ConfigManager(DIR)
log = LogManager(config)
db = DbManager(config, log)