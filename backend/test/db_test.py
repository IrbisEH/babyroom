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

def get_model_dic():
    models_dic = {}
    for name, obj in inspect.getmembers(DbModels, inspect.isclass):
        if hasattr(obj, "__tablename__"):
            models_dic[obj.__tablename__] = obj
    return models_dic

def get_manager_class(model, tablename=None):
    if tablename is None:
        tablename = model.__tablename__ if hasattr(model, "__tablename__") else None
    manager = None
    if tablename is not None:
        manager = ProductManager if tablename == "products" else TableManager
    return manager


def insert_test_data():
    models_dic = get_model_dic()
    json_file = Path(DIR, "test", "test_data.json")
    raw_data = json.load(open(json_file, "r"))
    data = raw_data[0]

    for key, value in data.items():
        model = models_dic[key]
        manager_class = get_manager_class(model)
        manager = manager_class(config, log, db, model)
        for item in value:
            if manager is not None:
                manager.create(item)
            else:
                log.error("can not create while no manager")

def create_user():
    try:
        user = DbModels.UserModel(username="admin")
        user.set_password("admin")
        db.session.add(user)
        db.session.commit()
        log.info(f"User {user.username} created successfully. ")
    except Exception as e:
        log.error(e)


def test_product_delete():
    db.connect()
    products = db.session.query(DbModels.ProductModel).all()
    data = {"id": products[0].id}
    db.disconnect()

    manager = ProductManager(config, log, db)
    res = manager.delete(data)

    print(res.to_dict())


if __name__ == '__main__':
    db.connect()
    db.drop_tables()
    db.create_tables()
    insert_test_data()
    create_user()
    db.disconnect()
