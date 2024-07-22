from ..Models.ProductModel import ProductModel
from .TableManager import TableManager
from ..AppModels.ResultModel import Result


class ProductManager(TableManager):
    def __init__(self, config, log):
        self.model = ProductModel
        super().__init__(config, log, self.model)
