from ..DbModels import TagDbModel


class TagModel:
    DB_MODEL = TagDbModel

    def __init__(self, id=None, name=None, **kwargs):
        self.id = int(id) if id is not None else None
        self.name = str(name) if name is not None else None

    def get_dbmodel(self):
        return self.DB_MODEL(**vars(self))