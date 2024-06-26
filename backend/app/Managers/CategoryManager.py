from ..Models.CategoryModel import CategoryModel
from .TableManager import TableManager


class CategoryManager(TableManager):
    def __init__(self, config, log):
        self.model = CategoryModel
        super().__init__(config, log, self.model)
