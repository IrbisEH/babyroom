from ..AppModels.ResultModel import Result
from .DbManager import DbManager
from .ImageStoreManager import ImageStoreManager


class TableManager:
    def __init__(self, config, log, model):
        self.config = config
        self.log = log
        self.db = DbManager(config, log)
        self.db.connect()
        self.model = model

    def get(self, params=None):
        result = Result()
        try:
            data = self.db.session.query(self.model.DB_MODEL).all()
            result.data = [vars(self.model(**vars(item))) for item in data]
        except Exception as e:
            result.get_error(msg=str(e))
        finally:
            self.db.disconnect()

        return result

    def create(self, data, files=None):
        result = Result()
        try:
            model = self.model(**data)

            dbmodel = model.get_dbmodel()

            self.db.session.add(dbmodel)
            self.db.session.commit()

            model.id = dbmodel.id

            self.log.info(f"Add new entry. Table: {self.model.DB_MODEL.__tablename__}")

            result.data = vars(model)

        except Exception as e:
            self.db.session.rollback()
            result.get_error(msg=str(e))
        finally:
            self.db.disconnect()

        return result

    def update(self, data, files=None):
        result = Result()
        try:
            model = self.model(**data)

            if not model.id:
                raise Exception("Missing entry id")

            if files is not None and len(files):
                img_manager = ImageStoreManager(self.config, self.log)
                result = img_manager.save_files(files)
                if result.success:
                    images = model.images.split(",") if model.images else []
                    images += result.data
                    model.images = ",".join(images)
                else:
                    raise Exception(result.msg if hasattr(result, "msg") else "Unknown error")

            self.db.session.query(self.model.DB_MODEL).filter_by(id=model.id).update(vars(model))
            self.db.session.commit()
            self.log.info(f"Update entry. Table: {self.model.DB_MODEL.__tablename__}")
            result.data = vars(model)

        except Exception as e:
            self.db.session.rollback()
            self.log.error(str(e))
            result.get_error(msg=str(e))
        finally:
            self.db.disconnect()

        return result

    def delete(self, data):
        result = Result()
        try:
            model = self.model(**data)

            if not model.id:
                raise Exception("Missing entry id")

            dbmodel = self.db.session.query(self.model.DB_MODEL).get(model.id)

            self.db.session.delete(dbmodel)
            self.db.session.commit()

        except Exception as e:
            self.db.session.rollback()
            result.get_error(msg=str(e))
        finally:
            self.db.disconnect()

        return result
