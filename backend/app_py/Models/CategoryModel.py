from ..DbModels import CategoryDbModel


class CategoryModel:
    DB_MODEL = CategoryDbModel

    def __init__(self, id=None, name=None, description=None, **kwargs):
        self.id = int(id) if id is not None else None
        self.name = str(name) if name is not None else None
        self.description = str(description) if description is not None else None

    def get_dbmodel(self):
        return self.DB_MODEL(**vars(self))
