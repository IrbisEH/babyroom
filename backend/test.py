import os

from app_py.Managers.ConfigManager import ConfigManager
from app_py.Managers.LogManager import LogManager
from app_py.Managers.DbManager import DbManager

from app_py.Managers.TagManager import TagManager
from app_py.Managers.ProductManager import ProductManager

from app_py.Models.ProductModel import ProductModel
from app_py.Models.TagModel import TagModel

DIR = os.path.dirname(__file__)

config = ConfigManager(DIR)
log = LogManager(config)
db = DbManager(config, log)

tag_manager = TagManager(config, log)
product_manager = ProductManager(config, log)

product_data = {
    "name": "first product",
    "price": 100,
    "tags": [
        {
            "id": 1,
            "name": "красный"
        },
        {
            "id": 2,
            "name": "скидка"
        }
    ]
}

db.connect()
db.drop_tables()
db.create_tables()
db.disconnect()

for tag in product_data['tags']:
    tag_manager.create(tag)

product_manager.create(product_data)
