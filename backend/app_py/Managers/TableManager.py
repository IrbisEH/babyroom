from ..AppModels.ResultModel import Result


class TableManager:
    def __init__(self, config, log, db, db_model):
        self.config = config
        self.log = log
        self.db = db
        self.db.connect()
        self.db_model = db_model

        self.methods = {
            "GET": self.get,
            "POST": self.create,
            "PUT": self.update,
            "DELETE": self.delete,
        }

    def handle_request(self, api_request):
        result = Result().get_error("Invalid Request")

        if api_request.method in self.methods.keys():
            data = api_request.get_json() if api_request.data else None
            result = self.methods[api_request.method](data)

        return result

    def set_filter(self, query, params):
        return query

    def get(self, data=None):
        result = Result()
        try:
            query = self.db.session.query(self.db_model)

            if data is not None:
                query = self.set_filter(query, data)

            response = query.all()

            self.log.debug(f"Get {query.count()} rows. Table: {self.db_model.__tablename__}")

            result.get_ok([item.serialize() for item in response])

        except Exception as e:
            msg = str(e)
            self.log.error(msg)
            result.get_error(msg)
        finally:
            self.db.disconnect()

        return result

    def create(self, data=None):
        result = Result()
        try:
            model = self.db_model(**data)

            self.db.session.add(model)

            self.log.debug(f"Create model. Table: {self.db_model.__tablename__} Obj: {model.serialize()}")

            result.get_ok(model.serialize())

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result.get_error(msg)
        finally:
            self.db.session.commit()
            self.db.disconnect()

        return result

    def update(self, data=None):
        result = Result()
        try:
            if "id" not in data or data["id"] is None or data["id"] == "":
                raise Exception("Missing entry id")

            model = self.db.session.query(self.db_model).get(data["id"])

            for key, value in data.items():
                if hasattr(model, key):
                    setattr(model, key, value)

            self.db.session.add(model)

            self.log.debug(f"Update model. Table: {self.db_model.__tablename__} Obj: {model.serialize()}")

            result.get_ok(model.serialize())

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result.get_error(msg)
        finally:
            self.db.session.commit()
            self.db.disconnect()

        return result

    def delete(self, data=None):
        result = Result()
        try:
            if "id" not in data or data["id"] is None or data["id"] == "":
                raise Exception("Missing entry id")

            model = self.db.session.query(self.db_model).get(data["id"])

            self.db.session.delete(model)

            self.log.debug(f"Delete model. Table: {self.db_model.__tablename__} Obj: {model.serialize()}")

            result.get_ok(model.serialize())

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result.get_error(msg)
        finally:
            self.db.session.commit()
            self.db.disconnect()

        return result
