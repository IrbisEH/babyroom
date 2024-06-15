import os
import json

import app.Exceptions as Exceptions

from datetime import timedelta

from flask import Flask, request, jsonify, make_response
from flask_jwt_extended import (
    JWTManager, jwt_required, get_jwt_identity, create_access_token
)
from flask_cors import CORS

from app.Managers.ConfigManager import ConfigManager
from app.Managers.LogManager import LogManager
from app.Managers.DbManager import DbManager
from app.Models.UserModel import UserModel
from app.Models.ProductCategoryModel import ProductCategoryModel

from app.Result import Result

DIR = os.path.dirname(__file__)

config = ConfigManager(DIR)
log = LogManager(config)
db = DbManager(config, log)

app = Flask(__name__)
cors = CORS(app)

app.config["JWT_SECRET_KEY"] = "secret-code"
jwt = JWTManager(app)

@app.route("/api/login", methods=['POST'])
def login():
    result = Result()
    try:
        username, password = request.json["username"], request.json["password"]

        if not username or not password:
            raise Exception("Missing username and password")

        user = db.session.query(UserModel).filter_by(username=username).first()

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
        result = Result(msg=msg, status=400)

    return jsonify(result.to_dict()), result.status


# TODO: Проверить Expire
@app.route("/api/check_jwt", methods=["GET"])
@jwt_required()
def check_jwt():
    result = Result()
    try:
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

    return jsonify(result.to_dict()), result.status

# @app.route("/api/create_product_category", methods=["POST"])
# @jwt_required()
# def create_product_category():
#     result = GetError()
#     try:
#         data = request.get_json()
#
#         if data["units"] and len(data["units"]) > 0:
#             units_list = data["units"].split("\n")
#             print(units_list)
#             units_list = list(filter(lambda x: len(x) > 0, units_list))
#             data["units"] = json.dumps(units_list)
#
#         category = ProductCategoryModel(**data)
#         db.session.add(category)
#         db.session.commit()
#
#         result = GetOk(category.to_dict())
#     except Exception as e:
#         error_msg = e.args[0]
#         log.error(error_msg)
#         result = GetError(error_msg=error_msg)
#
#     return jsonify(result), 200


if __name__ == "__main__":
    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )

