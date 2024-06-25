from ..Models.ProductModel import ProductModel
from .TableManager import TableManager


class ProductManager(TableManager):
    def __init__(self, config, log, db):
        self.model = ProductModel
        super().__init__(config, log, db, self.model)
