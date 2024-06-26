import os

from .ResultModel import Result
from .DbManager import DbManager

class TableManager:
    def __init__(self,config, log, model):
        self.config = config
        self.log = log
        self.db = DbManager(config, log)
        self.model = model

    def get(self, params=None):
        #TODO: Метод должен принимать фильтр
        result = Result()
        try:
            data = self.db.session.query(self.model).all()
            result.data = [item.to_dict() for item in data]
        except Exception as e:
            msg = str(e)
            self.log.error(msg)
            result = Result(msg=msg, status=401)

        return result

    def create(self, data):
        result = Result()
        try:
            model = self.model(**data)
            self.db.session.add(model)
            self.db.session.commit()
            self.log.info(f"Add new entry. Table: {model.__tablename__}")
            result.data = model.to_dict()

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result = Result(msg=msg, status=401)

        return result

    def update(self, data):
        result = Result()
        try:
            if "id" in data:
                model = self.model(**data)
                self.db.session.query(self.model).filter_by(id=data["id"]).update(data)
                self.db.session.commit()
                self.log.info(f"Update entry. Table: {model.__tablename__}")
                result.data = model.to_dict()
            else:
                raise Exception("Missing entry id")

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result = Result(msg=msg, status=401)

        return result

    def delete(self, data):
        result = Result()
        try:
            if "id" in data:
                model = self.db.session.query(self.model).get(data["id"])
                self.db.session.delete(model)
                self.db.session.commit()
            else:
                raise Exception("Missing entry id")

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result = Result(msg=msg, status=401)

        return result
