from datetime import timedelta
from flask_jwt_extended import create_access_token

from ..AppModels.ResultModel import Result
from ..DbModels import UserModel

from ..Exceptions import InvalidCredentialsException


class UserManager:
    def __init__(self, config, log, db):
        self.config = config
        self.log = log
        self.db = db
        self.model = UserModel

        self.db.connect()

    def login(self, data):
        result = Result()
        try:
            username, password = data["username"], data["password"]

            if not username or not password:
                raise Exception("Missing username and password")

            user = self.db.session.query(UserModel).filter_by(username=username).first()

            if user is None:
                raise InvalidCredentialsException(f"Username: {username} not found")

            if not user.check_password(password):
                raise InvalidCredentialsException("Invalid password")

            expires = timedelta(days=self.config.app_config.user_expire)
            access_token = create_access_token(identity=username, expires_delta=expires)

            self.log.debug(f"For user: {user.username} created access token.")

            result.get_ok({
                "username": user.username,
                "token": access_token,
            })

        except InvalidCredentialsException as e:
            msg = str(e)
            self.log.error(msg)
            result.get_error(msg=msg, status=401)
        except Exception as e:
            msg = str(e)
            self.log.error(msg)
            result.get_error(msg=msg, status=500)
        finally:
            self.db.disconnect()

        return result

    def check_jwt(self, username=None):
        result = Result()
        try:
            if username is None:
                raise Exception("Missing username")

            user = self.db.session.query(UserModel).filter_by(username=username).first()

            if user is None:
                raise Exception("User not found")

            self.log.debug(f"User: {user.username}, checked JWT successfully.")

            result.get_ok({
                "username": user.username
            })

        except Exception as e:
            msg = str(e)
            self.log.error(msg)
            result.get_error(msg=msg, status=400)
        finally:
            self.db.disconnect()

        return result
