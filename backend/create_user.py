import os

from sqlalchemy import select

from app.Managers.ConfigManager import ConfigManager
from app.Managers.LogManager import LogManager
from app.Managers.DbManager import DbManager
from app.Models.UserModel import UserModel

DIR = os.path.dirname(__file__)

config = ConfigManager(DIR)
log = LogManager(config)
db = DbManager(config, log)

def create_user(username, password):
    try:
        user = UserModel(username=username)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        log.info(f"User {user.username} created successfully. ")
    except Exception as e:
        log.error(e)

def check_user(username, password):
    try:
        user = db.session.query(UserModel).filter_by(username=username).first()
        if user.check_password(password):
            log.info(f"User {user.username} verified successfully.")
        else:
            log.warning(f"User {user.username} verification failed.")
    except Exception as e:
        log.error(e)


if __name__ == '__main__':
    username = input("input username > ")
    password = input("input password > ")

    if not username or not password:
        print("Restart script and input correct username or password.")
        exit(1)

    create_user(username, password)
    check_user(username, password)
