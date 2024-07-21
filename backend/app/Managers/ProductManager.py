from ..DbModels.ProductModel import ProductModel
from .TableManager import TableManager
from ..AppModels.ResultModel import Result


class ProductManager(TableManager):
    def __init__(self, config, log):
        self.model = ProductModel
        super().__init__(config, log, self.model)

    def create(self, data, files=None):
        if "images" in data and isinstance(data["images"], list):
            data["images"] = ",".join(data["images"])
        return super().create(data, files)

    def update(self, data, files=None):
        if "images" in data and isinstance(data["images"], list):
            data["images"] = ",".join(data["images"])
        return super().update(data, files)
