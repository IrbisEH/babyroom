import sys
import os
import json
import inspect
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1] / 'app_py'))

import DbModels

from Managers.ConfigManager import ConfigManager
from Managers.LogManager import LogManager
from Managers.DbManager import DbManager
from Managers.TableManager import TableManager
from Managers.ProductManager import ProductManager


DIR = Path(__file__).resolve().parents[1]

config = ConfigManager(DIR)
log = LogManager(config)
db = DbManager(config, log)

def insert_test_data():
    models_dic = {}
    for name, obj in inspect.getmembers(DbModels, inspect.isclass):
        if hasattr(obj, "__tablename__"):
            models_dic[obj.__tablename__] = obj

    json_file = Path(DIR, "test", "test_data.json")
    raw_data = json.load(open(json_file, "r"))
    data = raw_data[0]

    for key, value in data.items():
        model = models_dic[key]
        manager_class = ProductManager if key == "products" else TableManager
        manager = manager_class(config, log, db, model)
        for item in value:
            manager.create(item)


if __name__ == '__main__':
    db.connect()
    db.drop_tables()
    db.create_tables()
    insert_test_data()
    db.disconnect()