from sqlalchemy.orm import DeclarativeBase, Mapped
from typing import List, TYPE_CHECKING
from sqlalchemy import String, Column, Integer, Text, Float, ForeignKey, Table
from sqlalchemy.orm import relationship


class Base(DeclarativeBase):
    pass


if TYPE_CHECKING:
    from sqlalchemy.orm import Mapped


class UnitsDbModel(Base):
    __tablename__ = "units"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String(255), unique=True, nullable=False)
    description: Mapped[str] = Column(Text, nullable=True)
    units: Mapped[str] = Column(Text, nullable=False)


class CategoryDbModel(Base):
    __tablename__ = "categories"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String(255), unique=True, nullable=False)
    description: Mapped[str] = Column(Text, nullable=True)


class PromotionDbModel(Base):
    __tablename__ = "promotion"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    rule: Mapped[str] = Column(String(255), unique=True, nullable=False)


product_tag_association = Table(
    'product_tag_association', Base.metadata,
    Column('product_id', Integer, ForeignKey('products.id')),
    Column('tag_id', Integer, ForeignKey('tags.id'))
)

class TagDbModel(Base):
    __tablename__ = "tags"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String(255), unique=True, nullable=False)

    associated_products: Mapped[List["ProductDbModel"]] = relationship("ProductDbModel", secondary=product_tag_association, back_populates="tags")


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
    tags: Mapped[List[TagDbModel]] = relationship(secondary=product_tag_association, back_populates="associated_products")
    images: Mapped[str] = Column(String(2048), nullable=True)

    category: Mapped[CategoryDbModel] = relationship(CategoryDbModel, backref='products')
    unit: Mapped[UnitsDbModel] = relationship(UnitsDbModel, backref='products')
    promotion: Mapped[PromotionDbModel] = relationship(PromotionDbModel, backref='products')














