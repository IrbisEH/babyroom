import json
import traceback

from ..Models.ProductCategoryModel import ProductCategoryModel
from ..Models.ResultModel import Result


class ProductCategoryManager:
    def __init__(self, config, log, db):
        self.config = config
        self.log = log
        self.db = db

    def create_product_category(self, data):
        result = Result()
        try:
            data["units"] = json.dumps(data["units"])

            category = ProductCategoryModel(**data)

            self.db.session.add(category)
            self.db.session.commit()

            self.log.info(f"Added new product category id: {category.id} name: {category.name}")

            result.data = category.to_dict()

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result = Result(msg=msg, status=401)

        return result

    def update_product_category(self, data):
        result = Result()
        try:
            data["units"] = json.dumps(data["units"])

            category = ProductCategoryModel(**data)

            self.db.session.query(ProductCategoryModel).filter_by(id=data["id"]).update(data)

            self.db.session.commit()

            self.log.info(f"Update new product category id: {category.id} name: {category.name}")

            result.data = category.to_dict()

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result = Result(msg=msg, status=401)

        return result

    def get_product_category(self, category_id):
        result = Result()
        try:
            category = self.db.session.query(ProductCategoryModel).get(category_id)

        except Exception as e:
            msg = str(e)
            self.log.error(msg)
            result = Result(msg=msg, status=401)

        return result

    def change_product_category(self, data):
        pass

    def delete_product_category(self, category_id):
        result = Result()
        try:
            product_category = self.db.session.query(ProductCategoryModel).get(category_id)

            if product_category:
                self.db.session.delete(product_category)
                self.db.session.commit()
            else:
                raise Exception("Product category does not exist")

            result.data = category_id

        except Exception as e:
            self.db.session.rollback()
            msg = str(e)
            self.log.error(msg)
            result = Result(msg=msg, status=401)

        return result

    def get_product_category_list(self):
        result = Result()

        try:
            data = self.db.session.query(ProductCategoryModel).all()
            result.data = [item.to_dict() for item in data]
        except Exception as e:
            msg = str(e)
            self.log.error(msg)
            result = Result(msg=msg, status=401)

        return result


