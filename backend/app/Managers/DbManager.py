from sqlalchemy.orm import Session
from ..Models import Base
from sqlalchemy.sql import text
from sqlalchemy import create_engine

class DbManager:
    def __init__(self, config_manager=None, log_manager=None):
        self.config_manager = config_manager
        self.log_manager = log_manager
        self.session = None
        self.engine = None

        self.connect()

        if self.config_manager.app_config.debug:
            self.log_manager.debug("DbManager init")

    def connect(self):
        try:
            host = self.config_manager.app_config.db_host
            port = self.config_manager.app_config.db_port
            user = self.config_manager.app_config.db_user
            password = self.config_manager.app_config.db_pass
            database = self.config_manager.app_config.db_name

            self.engine = create_engine(
                f"mysql+pymysql://{user}:{password}@{host}:{port}/{database}",
                isolation_level="READ COMMITTED"
            )

            self.session = Session(bind=self.engine)
            result = self.session.execute(text("SELECT VERSION()")).first()
            if len(result):
                self.log_manager.info(f'Test text execution. version DB: {result[0]}')
                self.log_manager.info('Connect to DB successfully done.')
            else:
                raise Exception()

        except Exception as e:
            self.log_manager.error('Connect to DB failed.')

    def create_tables(self):
        try:
            Base.metadata.create_all(self.engine)
            self.log_manager.info(f'Tables created.')
        except Exception as e:
            self.log_manager.error(e)