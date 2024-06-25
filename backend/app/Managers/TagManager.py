from ..Models.TagModel import TagModel
from .TableManager import TableManager


class TagManager(TableManager):
    def __init__(self, config, log, db):
        self.model = TagModel
        super().__init__(config, log, db, self.model)
