from ..AppModels.ResultModel import Result
from .DbManager import DbManager


class TableManager:
    def __init__(self, config, log, model):
        self.config = config
        self.log = log
        self.db = DbManager(config, log)
        self.model = model

    def get(self, params=None):
        result = Result()
        try:
            data = self.db.session.query(self.model.DB_MODEL).all()
            result.data = [vars(self.model(**vars(item))) for item in data]
        except Exception as e:
            result.get_error(msg=str(e))

        return result

    def create(self, data, files=None):
        result = Result()
        try:
            model = self.model(**data)

            if hasattr(model, "handle_files") and files is not None:
                result = model.handle_files(files, self.config)
                if not result.success:
                    raise Exception(result.msg)

            dbmodel = model.get_dbmodel()

            self.db.session.add(dbmodel)
            self.db.session.commit()

            model.id = dbmodel.id

            self.log.info(f"Add new entry. Table: {self.model.DB_MODEL.__tablename__}")

            result.data = vars(model)

        except Exception as e:
            self.db.session.rollback()
            result.get_error(msg=str(e))

        return result

    def update(self, data, files=None):
        result = Result()
        try:
            model = self.model(**data)

            if not model.id:
                raise Exception("Missing entry id")

            if hasattr(model, "handle_files") and files is not None:
                result = model.handle_files(files, self.config)
                if not result.success:
                    raise Exception(result.msg)

            self.db.session.query(self.model.DB_MODEL).filter_by(id=model.id).update(vars(model))
            self.db.session.commit()
            self.log.info(f"Update entry. Table: {self.model.DB_MODEL.__tablename__}")
            result.data = vars(model)

        except Exception as e:
            self.db.session.rollback()
            result.get_error(msg=str(e))

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

        return result
