from . import Base
from sqlalchemy import String, Column, Integer, Text, Float
from sqlalchemy.orm import Mapped


class TagModel(Base):
    __tablename__ = 'tags'

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String(255), unique=True, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
