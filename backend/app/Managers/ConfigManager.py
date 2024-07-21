import os
from pathlib import Path
from dotenv import load_dotenv


load_dotenv()

class AppPaths:
    def __init__(self,  root_path):
        self.root_dir = root_path
        self.logs = Path(self.root_dir, "logs")

        self.storage = Path(self.root_dir, "storage")
        self.img_storage = Path(self.storage, "images")
        self.product_img_storage = Path(self.img_storage, "products")


class AppConfig:
    app_name = None
    debug = None
    log_level = None

    db_host = None
    db_port = None
    db_user = None
    db_pass = None
    db_name = None

    user_expire = None

class ConfigManager:
    def __init__(self, root_path):
        self.paths = AppPaths(root_path)

        self.app_config = AppConfig()
        self.app_config.app_name = os.getenv("APP_NAME", "babyroom")
        self.app_config.debug = bool(int(os.getenv("DEBUG", 0)))
        self.app_config.log_level = os.getenv("LOG_LEVEL", "INFO")

        self.app_config.db_host = str(os.getenv("DB_HOST", "localhost"))
        self.app_config.db_port = str(os.getenv("DB_PORT", "3306"))
        self.app_config.db_user = str(os.getenv("DB_USER", ""))
        self.app_config.db_pass = str(os.getenv("DB_PASS", ""))
        self.app_config.db_name = str(os.getenv("DB_NAME", "test_school"))

        self.app_config.jwt_secret_code = os.getenv("JWT_SECRET_KEY", "secret_code")
        self.app_config.user_expire = int(os.getenv("USER_EXPIRE", 30))

        self.create_paths()

    def create_paths(self):
        for path in vars(self.paths).values():
            os.makedirs(path, exist_ok=True)
            os.chmod(path, 0o777)
