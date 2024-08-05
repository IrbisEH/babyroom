from sqlalchemy.orm import DeclarativeBase, Mapped
from typing import List, TYPE_CHECKING
from sqlalchemy import String, Column, Integer, Text, Float, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.orm import class_mapper
from passlib.hash import pbkdf2_sha256


class Base(DeclarativeBase):
    __abstract__ = True

    def serialize(self, exclude=None):
        exclude = exclude or []

        serialized = {}

        for column in class_mapper(self.__class__).columns:
            value = getattr(self, column.name)
            serialized[column.name] = value

        for related_item in class_mapper(self.__class__).relationships:
            if related_item.key in exclude:
                continue

            related = getattr(self, related_item.key)

            if related is not None:
                if isinstance(related, list):
                    serialized[related_item.key] = [item.serialize(exclude=exclude) for item in related]
                else:
                    serialized[related_item.key] = related.serialize(exclude=exclude)

        return serialized


if TYPE_CHECKING:
    from sqlalchemy.orm import Mapped


class UserModel(Base):
    __tablename__ = 'users'

    id: Mapped[int] = Column(Integer, primary_key=True)
    username: Mapped[str] = Column(String(30), unique=True, nullable=False)
    password: Mapped[str] = Column(String(255), unique=True, nullable=False)

    def set_password(self, password: str):
        self.password = pbkdf2_sha256.hash(password)

    def check_password(self, password: str):
        return pbkdf2_sha256.verify(password, self.password)


class UnitsModel(Base):
    __tablename__ = "units"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String(255), unique=True, nullable=False)
    description: Mapped[str] = Column(Text, nullable=True)
    units: Mapped[str] = Column(Text, nullable=False)


class CategoryModel(Base):
    __tablename__ = "categories"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String(255), unique=True, nullable=False)
    description: Mapped[str] = Column(Text, nullable=True)


class PromotionModel(Base):
    __tablename__ = "promotion"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    rule: Mapped[str] = Column(String(255), unique=True, nullable=False)


product_tag_association = Table(
    'product_tag_association', Base.metadata,
    Column('product_id', Integer, ForeignKey('products.id')),
    Column('tag_id', Integer, ForeignKey('tags.id'))
)

class TagModel(Base):
    __tablename__ = "tags"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String(255), unique=True, nullable=False)

    associated_products: Mapped[List["ProductModel"]] = relationship("ProductModel", secondary=product_tag_association, back_populates="tags")


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
    tags: Mapped[List[TagModel]] = relationship(secondary=product_tag_association, back_populates="associated_products")
    images: Mapped[str] = Column(String(2048), nullable=True)

    category: Mapped[CategoryModel] = relationship(CategoryModel, backref='products')
    unit: Mapped[UnitsModel] = relationship(UnitsModel, backref='products')
    promotion: Mapped[PromotionModel] = relationship(PromotionModel, backref='products')

    def serialize(self, exclude=None):
        exclude = exclude or ["associated_products"]
        data = super().serialize(exclude)
        data["images"] = data["images"].split(",") if data["images"] else None
        return data













