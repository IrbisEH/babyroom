from . import Base
from sqlalchemy import String, Column, Integer, Text, Float
from sqlalchemy.orm import Mapped


class PromotionDbModel(Base):
    __tablename__ = 'promotion'

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    rule: Mapped[str] = Column(String(255), unique=True, nullable=False)


class PromotionModel:
    DB_MODEL = PromotionDbModel

    def __init__(self, id=None, rule=None, **kwargs):
        self.id = int(id) if id is not None else None
        self.rule = str(rule) if rule is not None else None

    def get_dbmodel(self):
        return self.DB_MODEL(**vars(self))