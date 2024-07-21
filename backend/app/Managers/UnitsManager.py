from ..DbModels.UnitsModel import UnitsModel
from .TableManager import TableManager


class UnitsManager(TableManager):
    def __init__(self, config, log):
        self.model = UnitsModel
        super().__init__(config, log, self.model)
