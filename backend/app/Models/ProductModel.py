from . import Base
from sqlalchemy import String, Column, Integer, Text, Float
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column


class ProductModel(Base):
    __tablename__ = 'products'

    id: Mapped[int] = Column(Integer, primary_key=True)
    enable: Mapped[int] = Column(Integer, nullable=False, default=0)
    title: Mapped[str] = Column(String(30), nullable=False)
    subtitle: Mapped[str] = Column(String(30))
    description: Mapped[str] = Column(Text)
    img_path: Mapped[str] = Column(String(2048))
    price: Mapped[float] = Column(Float, nullable=False)
