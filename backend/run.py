import os

import app.Exceptions as Exceptions

from datetime import timedelta

from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager, jwt_required, get_jwt_identity, create_access_token
)

from flask_cors import CORS

from app.Managers.ConfigManager import ConfigManager
from app.Managers.LogManager import LogManager
from app.Managers.DbManager import DbManager
from app.Managers.UnitsManager import UnitsManager
from app.Managers.PromotionManager import PromotionManager
from app.Managers.TagManager import TagManager
from app.Managers.CategoryManager import CategoryManager
from app.Managers.ProductManager import ProductManager
from app.Models.UserModel import UserModel
from app.Managers.ResultModel import Result

DIR = os.path.dirname(__file__)

config = ConfigManager(DIR)
log = LogManager(config)
db = DbManager(config, log)

app = Flask(__name__)
cors = CORS(app)
print("work")
app.config["JWT_SECRET_KEY"] = config.app_config.jwt_secret_code
jwt = JWTManager(app)

@app.before_request
def before_request():
    headers = {'Access-Control-Allow-Origin': '*',
               'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
               'Access-Control-Allow-Headers': 'Content-Type'}
    if request.method.lower() == 'options':
        return jsonify(headers), 200

@app.route("/api/login", methods=['POST'])
def login():
    result = Result()
    try:
        username, password = request.json["username"], request.json["password"]

        if not username or not password:
            raise Exception("Missing username and password")

        #TODO: инициализировать db отдельно
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

def request_handler(manager, req):
    result = Result()
    try:
        if req.method == "GET":
            result = manager.get()
        elif req.method == "POST":
            data = req.get_json()
            result = manager.create(data)
        elif req.method == "PUT":
            data = req.get_json()
            result = manager.update(data)
        elif req.method == "DELETE":
            data = req.get_json()
            manager.delete(data)
        else:
            pass

    except Exceptions.InvalidCredentialsException as e:
        msg = str(e)
        log.error(msg)
        result = Result(msg=msg, status=401)
    except Exception as e:
        msg = str(e)
        log.error(msg)
        result = Result(msg=msg, status=400)

    return result

@app.route("/api/units", methods=["POST", "GET", "PUT", "DELETE"])
@jwt_required()
def handle_units():
    manager = UnitsManager(config, log)
    result = request_handler(manager, request)
    return jsonify(result.to_dict()), result.status

@app.route("/api/promotion", methods=["POST", "GET", "PUT", "DELETE"])
@jwt_required()
def handle_promotion():
    manager = PromotionManager(config, log)
    result = request_handler(manager, request)
    return jsonify(result.to_dict()), result.status

@app.route("/api/tag", methods=["POST", "GET", "PUT", "DELETE"])
@jwt_required()
def handle_tag():
    manager = TagManager(config, log)
    result = request_handler(manager, request)
    return jsonify(result.to_dict()), result.status

@app.route("/api/category", methods=["POST", "GET", "PUT", "DELETE"])
@jwt_required()
def handle_category():
    manager = CategoryManager(config, log)
    result = request_handler(manager, request)
    return jsonify(result.to_dict()), result.status

@app.route("/api/product", methods=["POST", "GET", "PUT", "DELETE"])
@jwt_required()
def handle_product():
    manager = ProductManager(config, log)
    result = request_handler(manager, request)
    return jsonify(result.to_dict()), result.status


if __name__ == "__main__":
    app.run(
        debug=True,
        host="127.0.0.1",
        port=5001
    )

