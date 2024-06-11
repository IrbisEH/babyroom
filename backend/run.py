import os

from datetime import timedelta

from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager, jwt_required, get_jwt_identity, create_access_token
)
from flask_cors import CORS

from app.Managers.ConfigManager import ConfigManager
from app.Managers.LogManager import LogManager
from app.Managers.DbManager import DbManager
from app.Models.UserModel import UserModel
from app.Managers.ResultManager import GetOk, GetError

DIR = os.path.dirname(__file__)

config = ConfigManager(DIR)
log = LogManager(config)
db = DbManager(config, log)

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config["JWT_SECRET_KEY"] = "secret-code"
jwt = JWTManager(app)


# TODO: разделить exception на известные и нет
# TODO: добавить коды ответа
@app.route("/api/login", methods=["POST"])
def login():
    result = GetError()
    try:
        username, password = request.json["username"], request.json["password"]

        if not username or not password:
            raise Exception("Missing username and password")

        user = db.session.query(UserModel).filter_by(username=username).first()

        if not user:
            raise Exception("User not found")

        if not user.check_password(password):
            raise Exception("Invalid password")

        # TODO: Проверить Expire
        expires = timedelta(days=config.app_config.user_expire)
        access_token = create_access_token(identity=username, expires_delta=expires)

        result = GetOk({
            "access_token": access_token
        })

        log.info(f"User: {user.username} logged in successfully.")

    except Exception as e:
        error_msg = e.args[0]
        log.error(error_msg)
        result = GetError(error_msg=error_msg)

    return jsonify(result), 200


# TODO: Проверить Expire
@app.route("/api/check_jwt", methods=["GET"])
@jwt_required()
def check_jwt():
    result = GetError()

    print(get_jwt_identity())

    try:
        user = db.session.query(UserModel).filter_by(username=get_jwt_identity()).first()

        if not user:
            raise Exception("User not found")

        result = GetOk({
            "username": user.username
        })

        log.info(f"User: {user.username}, checked JWT successfully.")

    except Exception as e:
        error_msg = e.args[0]
        log.error(error_msg)
        result = GetError(error_msg=error_msg)

    return jsonify(result), 200


if __name__ == "__main__":
    app.run(
        debug=True,
        host="192.168.1.72",
        port=5000
    )

