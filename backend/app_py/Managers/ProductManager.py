from .TableManager import TableManager
from ..DbModels import ProductModel, TagModel
from ..AppModels.ResultModel import Result
from ..Managers.ImageStoreManager import ImageStoreManager
from ..AppModels.FilterModel import FilterModel


class ProductManager(TableManager):
    def __init__(self, config, log, db):
        self.model = ProductModel
        super().__init__(config, log, db, self.model)

    def set_filter(self, query, params):
        filters = []

        for key, value in params.items():
            model = FilterModel(**value)

            obj_model = self.model

            if key == "tags":
                query = query.join(self.model.tags)
                obj_model = TagModel

            if model.operator == "=":
                filters.append(getattr(obj_model, model.prop) == model.value)
            if model.operator == "in":
                filters.append(getattr(obj_model, model.prop).in_(model.value))

        query = query.filter(*filters)

        return query

    def get(self, params=None):
        result = Result()
        filter_params = params["filter"] if params and "filter" in params else None
        try:
            query = self.db.session.query(self.model)

            if filter_params is not None:
                query = self.set_filter(query, params)

            response = query.all()

            self.log.debug(f"Get {query.count()} rows. Table: {self.model.__tablename__}")

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
        data = params["data"] if params and "data" in params else {}
        files = params["files"] if params and "files" in params else []
        try:
            if files is not None and len(files):
                img_manager = ImageStoreManager(self.config, self.log)
                result = img_manager.save_files(files)
                if result.success:
                    data["images"] = result.data
                else:
                    raise Exception(result.msg if hasattr(result, "msg") else "Unknown error")

            data["images"] = ",".join(data["images"]) if data["images"] else None

            data["tags"] = self.db.session.query(TagModel).filter(
                TagModel.id.in_([tag["id"] for tag in data["tags"]])
            ).all()

            model = self.model(**data)

            self.db.session.add(model)
            self.db.session.commit()

            self.log.debug(f"Create model. Table: {self.model.__tablename__} Obj: {model.serialize()}")

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

        data = params["data"] if params and "data" in params else {}
        files = params["files"] if params and "files" in params else []

        img_manager = ImageStoreManager(self.config, self.log)
        identifiers_to_remove = None

        try:
            if "id" not in data or data["id"] is None:
                raise Exception("Missing entry id")

            model = self.db.session.query(self.model).get(data["id"])

            if model.images is not None:
                identifiers_to_remove = [identifier not in data["images"] for identifier in model.images.split(",")]

            if files is not None and len(files):
                result = img_manager.save_files(files)
                if result.success:
                    data["images"] += result.data
                else:
                    raise Exception(result.msg if hasattr(result, "msg") else "Unknown error")

            data["images"] = ",".join(data["images"]) if data["images"] else None

            data["tags"] = self.db.session.query(TagModel).filter(
                TagModel.id.in_([tag["id"] for tag in data["tags"]])
            ).all()

            for key, value in data.items():
                if hasattr(model, key):
                    setattr(model, key, value)

            self.db.session.add(model)
            self.db.session.commit()

            self.log.debug(f"Update model. Table: {self.model.__tablename__} Obj: {model.serialize()}")

            if identifiers_to_remove is not None and len(identifiers_to_remove):
                img_manager.delete_files(identifiers_to_remove)

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

        data = params["data"] if params and "data" in params else {}

        img_manager = ImageStoreManager(self.config, self.log)
        identifiers_to_remove = None

        try:
            if "id" not in data or data["id"] is None:
                raise Exception("Missing entry id")

            model = self.db.session.query(self.model).get(data["id"])

            if model.images is not None:
                identifiers_to_remove = model.images.split(",")

            self.db.session.delete(model)
            self.db.session.commit()

            self.log.debug(f"Delete model. Table: {self.model.__tablename__} Obj: {model.serialize()}")

            if identifiers_to_remove is not None and len(identifiers_to_remove):
                img_manager.delete_files(identifiers_to_remove)

            result.get_ok(model.serialize())

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result.get_error(msg)
        finally:
            self.db.disconnect()

        return result
