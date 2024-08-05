from ..Models.ProductModel import ProductModel
from ..Models.TagModel import TagModel
from .TableManager import TableManager
from ..AppModels.ResultModel import Result
from ..Managers.ImageStoreManager import ImageStoreManager


class ProductManager(TableManager):
    def __init__(self, config, log):
        self.model = ProductModel
        super().__init__(config, log, self.model)

    def create(self, data, files=None):
        result = Result()
        try:
            model = self.model(**data)

            if files is not None and len(files):
                img_manager = ImageStoreManager(self.config, self.log)
                result = img_manager.save_files(files)
                if result.success:
                    model.images = result.data
                else:
                    raise Exception(result.msg if hasattr(result, "msg") else "Unknown error")

            data = vars(model)

            data["tags"] = self.db.session.query(TagModel.DB_MODEL).filter(
                TagModel.DB_MODEL.id.in_([tag.id for tag in model.tags])
            ).all()

            dbmodel = ProductModel.DB_MODEL(**data)

            print("work")

            self.db.session.add(dbmodel)
            self.db.session.commit()

            result.data = vars(ProductModel(**vars(dbmodel)))

            self.log.info(f"Add new entry. Table: {self.model.DB_MODEL.__tablename__}")

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result.get_error(msg)
        finally:
            self.db.disconnect()

        return result
