from pathlib import Path
import hashlib
import os
from PIL import Image

from ..AppModels.ResultModel import Result

class ImageStoreManager:
    EXT = ".jpg"
    OUTPUT_FORMAT = "JPEG"
    SIZES = {
        "small": (150, 200),
        "medium": (300, 400),
        "large": (600, 800)
    }

    def __init__(self, config, log):
        self.config = config
        self.log = log

    def save_files(self, files):
        result = Result()
        identifier_list = []
        try:
            if not isinstance(files, list):
                raise Exception(f"Can not handle {type(files)} when saving images")

            for idx, file in enumerate(files):
                if not file.filename:
                    raise Exception("Missing file name")

                filename, ext = os.path.splitext(file.filename)

                props = [str(value) for key, value in vars(self).items() if value is not None]
                props_str = "".join(props)

                hash_object = hashlib.sha256()
                hash_object.update(f'{filename}{props_str}'.encode('UTF-8'))
                hex_dig = hash_object.hexdigest()

                identifier = f"{hex_dig}_{idx}"
                source_file_path = Path(self.config.paths.img_storage, f"{identifier}{ext}")
                file.save(source_file_path)

                image = Image.open(source_file_path)

                for size_key, size in self.SIZES.items():
                    width, height = size
                    resized_image = image.resize((width, height), resample=Image.LANCZOS)
                    resized_image.info.clear()
                    file_path = Path(self.config.paths.img_storage, f"{identifier}_{size_key}{self.EXT}")
                    resized_image.save(file_path, self.OUTPUT_FORMAT, optimize=True, progressive=True)

                identifier_list.append(identifier)
                os.remove(source_file_path)

            result.get_ok(identifier_list)

        except Exception as e:

            if len(identifier_list):
                for filename in os.listdir(self.config.paths.img_storage):
                    if any(identifier in filename for identifier in identifier_list):
                        os.remove(Path(self.config.paths.img_storage, filename))

            result.get_error(str(e))
            self.log.error(str(e))

        return result








