from . import Base
from sqlalchemy import String, Column, Integer, Text, Float, ForeignKey
from sqlalchemy.orm import Mapped, relationship

from .CategoryModel import CategoryModel
from .UnitsModel import UnitsModel
from .PromotionModel import PromotionModel

class ProductModel(Base):
    __tablename__ = 'products'

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    enable: Mapped[int] = Column(Integer, nullable=False, default=0)
    name: Mapped[str] = Column(String(30), nullable=False)
    description: Mapped[str] = Column(Text)
    category_id: Mapped[int] = Column(Integer, ForeignKey('categories.id'))
    units_id: Mapped[int] = Column(Integer, ForeignKey('units.id'))
    promotion_id: Mapped[int] = Column(Integer, ForeignKey('promotion.id'))
    price: Mapped[float] = Column(Float, nullable=False)
    tags: Mapped[str] = Column(String(30), nullable=True)
    img: Mapped[str] = Column(String(2048), nullable=True)

    category: Mapped[CategoryModel] = relationship(CategoryModel, backref='products')
    unit: Mapped[UnitsModel] = relationship(UnitsModel, backref='products')
    promotion: Mapped[PromotionModel] = relationship(PromotionModel, backref='products')

    def to_dict(self):
        return {
            "id": self.id,
            "enable": self.enable,
            "name": self.name,
            "description": self.description,
            "category_id": self.category_id,
            "units_id": self.units_id,
            "promotion_id": self.promotion_id,
            "price": self.price,
            "tags": self.tags,
            "img": self.img
        }
