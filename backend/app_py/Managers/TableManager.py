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

        params = {
            "data": None,
            "files": None
        }

        if api_request.method in self.methods.keys():

            if api_request.method in ["GET"]:
                params["data"] = None

            if api_request.method in ["POST", "PUT"]:

                if api_request.form:
                    params["data"] = api_request.form.to_dict()
                else:
                    params["data"] = api_request.get_json()

                params["data"] = {key: value for key, value in params["data"].items() if
                                  value != "null" and value != ""}
                params["file"] = [file for key in api_request.files for file in api_request.files.getlist(key)]

            if api_request.method in ["DELETE"]:
                params["data"] = api_request.get_json()

            result = self.methods[api_request.method](params)

        return result

    def set_filter(self, query, params):
        return query

    def get(self, params=None):
        result = Result()
        filter_params = params["data"] if params and "data" in params else None
        try:
            query = self.db.session.query(self.db_model)

            if filter_params is not None:
                query = self.set_filter(query, params)

            response = query.all()

            self.log.debug(f"Get {query.count()} rows. Table: {self.db_model.__tablename__}")

            result.get_ok([item.serialize() for item in response])

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result.get_error(msg)
        finally:
            self.db.disconnect()

        return result

    def create(self, params=None):
        result = Result()
        data = params["data"] if "data" in params else {}
        try:
            model = self.db_model(**data)

            self.db.session.add(model)
            self.db.session.commit()

            self.log.debug(f"Create model. Table: {self.db_model.__tablename__} Obj: {model.serialize()}")

            result.get_ok(model.serialize())

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result.get_error(msg)
        finally:
            self.db.disconnect()

        return result

    def update(self, params=None):
        result = Result()
        data = params["data"] if "data" in params else {}
        try:
            if "id" not in data or data["id"] is None:
                raise Exception("Missing entry id")

            model = self.db.session.query(self.db_model).get(data["id"])

            for key, value in data.items():
                if hasattr(model, key):
                    setattr(model, key, value)

            self.db.session.add(model)
            self.db.session.commit()

            self.log.debug(f"Update model. Table: {self.db_model.__tablename__} Obj: {model.serialize()}")

            result.get_ok(model.serialize())

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result.get_error(msg)
        finally:
            self.db.disconnect()

        return result

    def delete(self, params=None):
        result = Result()
        data = params["data"] if "data" in params else {}

        try:
            if "id" not in data or data["id"] is None:
                raise Exception("Missing entry id")

            model = self.db.session.query(self.db_model).get(data["id"])

            self.db.session.delete(model)
            self.db.session.commit()

            self.log.debug(f"Delete model. Table: {self.db_model.__tablename__} Obj: {model.serialize()}")

            result.get_ok(model.serialize())

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result.get_error(msg)
        finally:
            self.db.disconnect()

        return result
