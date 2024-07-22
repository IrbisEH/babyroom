from ..Models.PromotionModel import PromotionModel
from .TableManager import TableManager


class PromotionManager(TableManager):
    def __init__(self, config, log):
        self.model = PromotionModel
        super().__init__(config, log, self.model)
