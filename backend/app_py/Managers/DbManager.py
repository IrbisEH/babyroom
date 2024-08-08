import sys
from pathlib import Path
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from sqlalchemy import create_engine

sys.path.append(str(Path(__file__).resolve().parents[1]))

from DbModels import Base


class DbManager:
    def __init__(self, config_manager=None, log_manager=None):
        self.config_manager = config_manager
        self.log_manager = log_manager
        self.session = None
        self.engine = None

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

        except Exception as e:
            msg = str(e)
            self.log_manager.error(msg)

    def disconnect(self):
        try:
            if self.session is None:
                raise Exception('Session was not initialized')

            self.session.close()
        except Exception as e:
            msg = str(e)
            self.log_manager.error(msg)

    def check_connection(self):
        try:
            if self.session is None:
                raise Exception('Session was not initialized')

            result = self.session.execute(text("SELECT VERSION()")).first()
            if len(result):
                self.log_manager.debug(f'Test text execution. version DB: {result[0]}')
                self.log_manager.debug('Connect to DB successfully done.')
            else:
                raise Exception('No answer from db')

        except Exception as e:
            msg = str(e)
            self.log_manager.error(msg)

    def create_tables(self):
        try:
            if self.session is None:
                raise Exception('Session was not initialized')

            Base.metadata.create_all(self.engine)
            self.log_manager.debug(f'Create DB successfully.')
        except Exception as e:
            msg = str(e)
            self.log_manager.error(msg)

    def drop_tables(self):
        try:
            if self.session is None:
                raise Exception('Session was not initialized')

            Base.metadata.drop_all(self.engine, checkfirst=True)
            self.log_manager.debug(f'Drop DB successfully.')
        except Exception as e:
            msg = str(e)
            self.log_manager.error(msg)
