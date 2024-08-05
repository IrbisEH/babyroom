from ..AppModels.ResultModel import Result
from ..DbModels import UserModel

from flask_jwt_extended import (
    JWTManager, jwt_required, get_jwt_identity, create_access_token
)

class UserManager:
    def __init__(self, config, log, db):
        self.config = config
        self.log = log
        self.db = db
        self.model = UserModel

        self.db.connect()

    def login(self, request):
        result = Result()
        username, password = request.json["username"], request.json["password"]

        if not username or not password:
            raise Exception("Missing username and password")

        db = DbManager(config, log)
        user = db.session.query(UserModel).filter_by(username=username).first()

        try:
            result = UserManager.login(request)

            if not user:
                raise Exceptions.InvalidCredentialsException("User not found")

            if not user.check_password(password):
                raise Exceptions.InvalidCredentialsException("Invalid password")

            expires = timedelta(days=config.app_config.user_expire)
            access_token = create_access_token(identity=username, expires_delta=expires)

            result.data = {
                "username": user.username,
                "token": access_token,
            }

            log.info(f"User: {user.username} logged in successfully.")

        except Exceptions.InvalidCredentialsException as e:
            msg = str(e)
            log.error(msg)
            result = Result(msg=msg, status=401)
        except Exception as e:
            msg = str(e)
            log.error(msg)
            result = Result(msg=msg, status=500)
        finally:
            if db is not None and db.session:
                db.session.close()

        return result

    def check_jwt(self, username=None):
        db = None
        result = Result()
        try:
            db = DbManager(config, log)
            user = db.session.query(UserModel).filter_by(username=get_jwt_identity()).first()

            if not user:
                raise Exception("User not found")

            result.data = {
                "username": user.username
            }

            log.info(f"User: {user.username}, checked JWT successfully.")

        except Exception as e:
            msg = str(e)
            log.error(msg)
            result = Result(msg=msg, status=400)
        finally:
            if db is not None and db.session:
                db.session.close()

        return jsonify(result.to_dict()), result.status