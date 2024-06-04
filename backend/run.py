from datetime import timedelta
from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager, jwt_required, get_jwt_identity, create_access_token
)
from flask_cors import CORS


app = Flask(__name__)

CORS(app)

app.config["JWT_SECRET_KEY"] = "secret-code"
jwt = JWTManager(app)


users = {
    "admin": "babyroom",
    "admin_2": "babyroom_2"
}

@app.route("/api/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username in users and users[username] == password:
        expires = timedelta(days=30)
        access_token = create_access_token(identity=username, expires_delta=expires)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"message": "Wrong username or password"}), 401

@app.route("/api/check_jwt", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


if __name__ == "__main__":
    app.run(
        debug=True,
        host="192.168.1.72",
        port=5000
    )

