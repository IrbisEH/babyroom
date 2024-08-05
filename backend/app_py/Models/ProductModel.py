from ..DbModels import ProductDbModel
from .TagModel import TagModel


class ProductModel:
    DB_MODEL = ProductDbModel

    def __init__(self, id=None, enable=None, name=None, description=None, category_id=None, units_id=None,
                 promotion_id=None, price=None, tags=None, images=None, **kwargs):
        self.id = int(id) if id is not None else None
        self.enable = int(enable) if enable is not None else 0
        self.name = str(name) if name is not None else None
        self.description = str(description) if description is not None else None
        self.category_id = int(category_id) if category_id is not None else None
        self.units_id = int(units_id) if units_id is not None else None
        self.promotion_id = int(promotion_id) if promotion_id is not None else None
        self.price = float(price) if price is not None else None
        self.tags = tags if tags is not None else []
        self.images = images if images is not None else None

        if isinstance(self.images, list):
            self.images = ",".join(self.images) if len(self.images) else None

        if len(self.tags):
            tags = []
            for tag in self.tags:
                if isinstance(tag, TagModel):
                    tags.append(tag)
                if isinstance(tag, dict):
                    tags.append(TagModel(**tag))
                else:
                    tags.append(TagModel(**vars(tag)))
            self.tags = tags




    # def get_dbmodel(self):
    #     data = vars(self)
    #     data["tags"] = [tag.get_dbmodel() for tag in data["tags"]]
    #     model = self.DB_MODEL(**data)
    #     return model
