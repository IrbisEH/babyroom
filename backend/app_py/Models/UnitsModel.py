from ..DbModels import UnitsDbModel


class UnitsModel:
    DB_MODEL = UnitsDbModel

    def __init__(self, id=None, name=None, description=None, units=None, **kwargs):
        self.id = int(id) if id is not None else None
        self.name = str(name) if name is not None else None
        self.description = str(description) if description is not None else None
        self.units = str(units) if units is not None else None

    def get_dbmodel(self):
        return self.DB_MODEL(**vars(self))