import os

from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager, jwt_required, get_jwt_identity
)

from app_py.Managers.ConfigManager import ConfigManager
from app_py.Managers.LogManager import LogManager
from app_py.Managers.DbManager import DbManager
from app_py.Managers.UserManager import UserManager
from app_py.Managers.TableManager import TableManager
from app_py.Managers.ProductManager import ProductManager

import app_py.DbModels

from flask_cors import CORS

DIR = os.path.dirname(__file__)

config = ConfigManager(DIR)
log = LogManager(config)
db = DbManager(config, log)

app = Flask(__name__)
cors = CORS(app)

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
    manager = UserManager(config, log, db)
    result = manager.login(request.get_json())
    return jsonify(result.to_dict()), result.status

@app.route("/api/check_jwt", methods=["GET"])
@jwt_required()
def check_jwt():
    manager = UserManager(config, log, db)
    result = manager.check_jwt(username=get_jwt_identity())
    return jsonify(result.to_dict()), result.status


@app.route("/api/units", methods=["POST", "GET", "PUT", "DELETE"])
@jwt_required()
def handle_units():
    manager = TableManager(config, log, db, app_py.DbModels.UnitsModel)
    result = manager.handle_request(request)
    return jsonify(result.to_dict()), result.status

@app.route("/api/promotion", methods=["POST", "GET", "PUT", "DELETE"])
@jwt_required()
def handle_promotion():
    manager = TableManager(config, log, db, app_py.DbModels.ProductRuleModel)
    result = manager.handle_request(request)
    return jsonify(result.to_dict()), result.status

@app.route("/api/tag", methods=["POST", "GET", "PUT", "DELETE"])
@jwt_required()
def handle_tag():
    manager = TableManager(config, log, db, app_py.DbModels.TagModel)
    result = manager.handle_request(request)
    return jsonify(result.to_dict()), result.status

@app.route("/api/category", methods=["POST", "GET", "PUT", "DELETE"])
@jwt_required()
def handle_category():
    manager = TableManager(config, log, db, app_py.DbModels.CategoryModel)
    result = manager.handle_request(request)
    return jsonify(result.to_dict()), result.status

@app.route("/api/product", methods=["POST", "GET", "PUT", "DELETE"])
@jwt_required()
def handle_product():
    manager = ProductManager(config, log, db)
    result = manager.handle_request(request)
    return jsonify(result.to_dict()), result.status

# @app.route("/api/delete_file", methods=["POST"])
# @jwt_required()
# def handle_delete_file():
#     result = Result()
#     data = request.get_json()
#     log.debug(data)
#     return jsonify(result.to_dict()), result.status


@app.route("/api/test", methods=["POST", "GET", "PUT", "DELETE"])
def test():
    return jsonify({"result": True}), 200
