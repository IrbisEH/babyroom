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

DIR = os.path.dirname(__file__)

config = ConfigManager(DIR)
log = LogManager(config)
db = DbManager(config, log)

app = Flask(__name__)

CORS(app)

app.config["JWT_SECRET_KEY"] = "secret-code"
jwt = JWTManager(app)


# TODO: разделить exception на известные и нет
# TODO: добавить коды ответа
@app.route("/api/login", methods=["POST"])
def login():
    try:
        username = request.json.get("username", None)
        password = request.json.get("password", None)

        if not username or not password:
            raise Exception("Missing username or password")

        user = db.session.query(UserModel).filter_by(username=username).first()

        if not user:
            raise Exception("User not found")

        if not user.check_password(password):
            raise Exception("Invalid password")

        expires = timedelta(days=config.app_config.user_expire)
        access_token = create_access_token(identity=username, expires_delta=expires)

        log.info(f"User: {username}, get access token and logged in.")
        return jsonify(access_token=access_token), 200
    except Exception as e:
        log.error(e)
        return jsonify({"Login error"}), 401


# TODO: Проверить Expire
@app.route("/api/check_jwt", methods=["GET"])
@jwt_required()
def check_jwt():
    try:
        user = db.session.query(UserModel).filter_by(username=get_jwt_identity()).first()
        if not user:
            raise Exception("User not found")
        log.info(f"User: {user.username}, checked JWT successfully.")
        return jsonify(logged_in_as=user.username), 200
    except Exception as e:
        log.error(e)
        return jsonify({"Login error"}), 401


if __name__ == "__main__":
    app.run(
        debug=True,
        host="192.168.1.72",
        port=5000
    )

