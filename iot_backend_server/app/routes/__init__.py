from .user_route import user_bp
from .sensor_route import sensor_bp
from .history_route import history_bp
from flask import Blueprint, jsonify

index_bp = Blueprint('index', __name__)

@index_bp.route("/", methods=["GET"])
def say_hello():
    return jsonify({"message": "Welcome to BK Green House"}), 200

def register_routes(app):
    app.register_blueprint(index_bp, url_prefix='/')
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(sensor_bp, url_prefix='/sensor')
    app.register_blueprint(history_bp, url_prefix='/history')