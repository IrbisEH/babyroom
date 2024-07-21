from ..DbModels.TagModel import TagModel
from .TableManager import TableManager


class TagManager(TableManager):
    def __init__(self, config, log):
        self.model = TagModel
        super().__init__(config, log, self.model)
