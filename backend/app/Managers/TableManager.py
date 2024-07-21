from ..AppModels.ResultModel import Result
from .DbManager import DbManager
import hashlib
import os
from pathlib import Path

class TableManager:
    def __init__(self, config, log, model):
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

    def create(self, data, files=None):
        result = Result()
        try:
            model = self.model(**data)

            if files:
                result = self.save_files(model, files)
                if not result.success:
                    raise Exception(result.msg)

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

    def update(self, data, files=None):
        result = Result()
        try:
            if "id" in data:
                model = self.model(**data)

                if files:
                    result = self.save_files(model, files)
                    if not result.success:
                        raise Exception(result.msg)
                print(model.images)
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

    def save_files(self, model, files):
        result = Result()
        add_files = []

        try:
            if not len(files):
                raise Exception("Missing files")

            for idx, file in enumerate(files):
                if file:
                    if file.filename == "":
                        raise Exception("Missing file name")

                    filename = file.filename
                    _, file_extension = os.path.splitext(filename)

                    props = [value for key, value in model.to_dict().items() if value]
                    props_str = "".join(props)

                    hash_object = hashlib.sha256()
                    hash_object.update(f'{filename}{props_str}'.encode('UTF-8'))
                    hex_dig = hash_object.hexdigest()

                    new_filepath = Path(self.config.paths.product_img_storage, f"{hex_dig}{idx}{file_extension}")
                    file.save(new_filepath)
                    add_files.append(new_filepath)

            model.add_images(add_files)

            result.get_ok()

        except Exception as e:
            if len(add_files):
                for file in add_files:
                    os.remove(file)
            self.log.error(e)
            result.get_error(e)

        return result

    def delete_files(self, files):
        for file in files:
            file_path = Path(self.config.paths.product_img_storage, file)
            if os.path.exists(file_path):
                os.remove(file_path)
