from . import Base
from sqlalchemy import String, Column, Integer, Text, Float
from sqlalchemy.orm import Mapped


class TagDbModel(Base):
    __tablename__ = 'tags'

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String(255), unique=True, nullable=False)


class TagModel:
    DB_MODEL = TagDbModel

    def __init__(self, id=None, name=None, **kwargs):
        self.id = int(id) if id is not None else None
        self.name = str(name) if name is not None else None

    def get_dbmodel(self):
        return self.DB_MODEL(**vars(self))