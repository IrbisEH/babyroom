from . import Base
from sqlalchemy import String, Column, Integer, Text
from sqlalchemy.orm import Mapped


class CategoryDbModel(Base):
    __tablename__ = 'categories'

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String(255), unique=True, nullable=False)
    description: Mapped[str] = Column(Text, nullable=True)


class CategoryModel:
    DB_MODEL = CategoryDbModel

    def __init__(self, id=None, name=None, description=None, **kwargs):
        self.id = int(id) if id is not None else None
        self.name = str(name) if name is not None else None
        self.description = str(description) if description is not None else None

    def get_dbmodel(self):
        return self.DB_MODEL(**vars(self))
