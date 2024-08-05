from ..DbModels import PromotionDbModel


class PromotionModel:
    DB_MODEL = PromotionDbModel

    def __init__(self, id=None, rule=None, **kwargs):
        self.id = int(id) if id is not None else None
        self.rule = str(rule) if rule is not None else None

    def get_dbmodel(self):
        return self.DB_MODEL(**vars(self))