from . import Base
from sqlalchemy import String, Column, Integer, Text, Float, ForeignKey
from sqlalchemy.orm import Mapped, relationship
from sqlalchemy.orm import mapped_column

from .ProductCategoryModel import ProductCategoryModel

class ProductModel(Base):
    __tablename__ = 'products'

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    category_id: Mapped[int] = Column(Integer, ForeignKey('product_categories.id'))
    enable: Mapped[int] = Column(Integer, nullable=False, default=0)
    title: Mapped[str] = Column(String(30), nullable=False)
    subtitle: Mapped[str] = Column(String(30))
    description: Mapped[str] = Column(Text)
    img_path: Mapped[str] = Column(String(2048))
    price: Mapped[float] = Column(Float, nullable=False)

    category: Mapped[ProductCategoryModel] = relationship('ProductCategoryManager', backref='products')
