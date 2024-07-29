from . import Base
from sqlalchemy import String, Column, Integer, Text, Float, ForeignKey
from sqlalchemy.orm import Mapped, relationship

from .CategoryModel import CategoryModel
from .UnitsModel import UnitsModel
from .PromotionModel import PromotionModel
from ..AppModels.ResultModel import Result
from pathlib import Path
import hashlib
import os


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

    def handle_files(self, files, app_config):
        result = Result()
        try:
            if not isinstance(files, list):
                raise Exception("Can not handle files list")

            result = self.save_files(files, app_config)

            if not result.success:
                raise Exception(result.msg)

            exists_filenames = self.images.split(",") if self.images is not None else []

            for filepath in result.data:
                filename = os.path.basename(filepath)
                exists_filenames.append(filename)

            self.images = ",".join(exists_filenames)

        except Exception as e:
            result.get_error(e)

        return result

    def save_files(self, files, app_config):
        result = Result()
        add_files = []

        try:
            for idx, file in enumerate(files):
                if file.filename == "":
                    raise Exception("Missing file name")

                filename = file.filename
                _, file_extension = os.path.splitext(filename)

                props = [str(value) for key, value in vars(self).items() if value is not None]
                props_str = "".join(props)

                hash_object = hashlib.sha256()
                hash_object.update(f'{filename}{props_str}'.encode('UTF-8'))
                hex_dig = hash_object.hexdigest()

                new_filepath = Path(app_config.paths.img_storage, f"{hex_dig}{idx}{file_extension}")
                file.save(new_filepath)
                add_files.append(new_filepath)

            result.get_ok(add_files)

        except Exception as e:
            if len(add_files):
                for file in add_files:
                    os.remove(file)
            result.get_error(e)

        return result
