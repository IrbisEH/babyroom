from . import Base
from sqlalchemy import String, Column, Integer, Text, Float
from sqlalchemy.orm import Mapped


class CategoryModel(Base):
    __tablename__ = 'categories'

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String(255), unique=True, nullable=False)
    description: Mapped[str] = Column(Text, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }
