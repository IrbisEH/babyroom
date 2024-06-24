from . import Base
from sqlalchemy import String, Column, Integer, Text, Float
from sqlalchemy.orm import Mapped


class PromotionModel(Base):
    __tablename__ = 'promotion'

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    rule: Mapped[str] = Column(String(255), unique=True, nullable=False)