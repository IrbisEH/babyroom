from . import Base
from sqlalchemy import String, Column, Integer, Text, Float
from sqlalchemy.orm import Mapped


class UnitsDbModel(Base):
    __tablename__ = 'units'

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String(255), unique=True, nullable=False)
    description: Mapped[str] = Column(Text, nullable=True)
    units: Mapped[str] = Column(Text, nullable=False)


class UnitsModel:
    DB_MODEL = UnitsDbModel

    def __init__(self, id=None, name=None, description=None, units=None, **kwargs):
        self.id = int(id) if id is not None else None
        self.name = str(name) if name is not None else None
        self.description = str(description) if description is not None else None
        self.units = str(units) if units is not None else None

    def get_dbmodel(self):
        return self.DB_MODEL(**vars(self))