from . import Base
from sqlalchemy import String, Column, Integer, Text, Float, ForeignKey
from sqlalchemy.orm import Mapped, relationship

from .CategoryModel import CategoryModel
from .UnitsModel import UnitsModel
from .PromotionModel import PromotionModel
from ..AppModels.ResultModel import Result


class ProductDbModel(Base):
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
    images: Mapped[str] = Column(String(2048), nullable=True)

    category: Mapped[CategoryModel] = relationship(CategoryModel.DB_MODEL, backref='products')
    unit: Mapped[UnitsModel] = relationship(UnitsModel.DB_MODEL, backref='products')
    promotion: Mapped[PromotionModel] = relationship(PromotionModel.DB_MODEL, backref='products')

class ProductModel:
    DB_MODEL = ProductDbModel

    def __init__(self, id=None, enable=None, name=None, description=None, category_id=None, units_id=None, promotion_id=None, price=None, tags=None, images=None, **kwargs):
        self.id = int(id) if id is not None else None
        self.enable = int(enable) if enable is not None else 0
        self.name = str(name) if name is not None else None
        self.description = str(description) if description is not None else None
        self.category_id = int(category_id) if category_id is not None else None
        self.units_id = int(units_id) if units_id is not None else None
        self.promotion_id = int(promotion_id) if promotion_id is not None else None
        self.price = float(price) if price is not None else None
        self.tags = str(tags) if tags is not None else None
        self.images = images if images is not None else None

        if isinstance(self.images, list):
            self.images = ",".join(self.images) if len(self.images) else None

    def get_dbmodel(self):
        return self.DB_MODEL(**vars(self))
