from .TableManager import TableManager
from ..DbModels import ProductModel, TagModel, ProductRuleModel
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

    def get(self, data=None):
        result = Result()
        try:
            query = self.db.session.query(self.model)

            if data is not None:
                query = self.set_filter(query, data)

            response = query.all()

            self.log.debug(f"Get {query.count()} rows. Table: {self.model.__tablename__}")

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
            if "product_rules" in data and len(data["product_rules"]):
                # id_list = [rule["id"] for rule in data["product_rules"] if "id" in rule]
                id_list = [int(rule_id) for rule_id in data["product_rules"]]
                data["product_rules"] = self.db.session.query(ProductRuleModel).filter(ProductRuleModel.id.in_(id_list)).all()

            if "tags" in data and len(data["tags"]):
                # id_list = [tag["id"] for tag in data["tags"] if "id" in tag]
                id_list = [int(tag_id) for tag_id in data["tags"]]
                data["tags"] = self.db.session.query(TagModel).filter(TagModel.id.in_(id_list)).all()

            #TODO:
            data["img_identifiers"] = None

            model = self.model(**data)
            self.db.session.add(model)
            self.db.session.commit()

            result.get_ok(model.serialize())
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

    def update(self, data=None):
        result = Result()
        for key, value in data.items():
            print(key, value)
        try:
            if "id" not in data or data["id"] is None:
                raise Exception("Missing entry id")

            model = self.db.session.query(self.model).get(data["id"])

            if "product_rules" in data and len(data["product_rules"]):
                # id_list = [rule["id"] for rule in data["product_rules"] if "id" in rule]
                id_list = [int(rule_id) for rule_id in data["product_rules"]]
                data["product_rules"] = self.db.session.query(ProductRuleModel).filter(ProductRuleModel.id.in_(id_list)).all()

            if "tags" in data and len(data["tags"]):
                # id_list = [tag["id"] for tag in data["tags"] if "id" in tag]
                id_list = [int(tag_id) for tag_id in data["tags"]]
                data["tags"] = self.db.session.query(TagModel).filter(TagModel.id.in_(id_list)).all()

            #TODO:
            data["img_identifiers"] = None

            for key, value in data.items():
                if hasattr(model, key):
                    setattr(model, key, value)

            self.db.session.add(model)
            self.db.session.commit()

            result.get_ok(model.serialize())
            self.log.debug(f"Update model. Table: {self.model.__tablename__} Obj: {model.serialize()}")

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result.get_error(msg)
        finally:
            self.db.disconnect()

        return result

    def delete(self, data=None):
        result = Result()
        try:
            if "id" not in data or data["id"] is None:
                raise Exception("Missing entry id")

            model = self.db.session.query(self.model).get(data["id"])
            self.db.session.delete(model)
            self.db.session.commit()

            result.get_ok(model.serialize())
            self.log.debug(f"Delete model. Table: {self.model.__tablename__} Obj: {model.serialize()}")

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result.get_error(msg)
        finally:
            self.db.disconnect()

        return result
