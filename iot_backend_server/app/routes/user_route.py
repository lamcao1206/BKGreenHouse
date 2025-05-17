from flask import Blueprint
from app.controllers.user_controller import UserController
from app.middlewares.authenticate_middleware import token_guard

user_bp = Blueprint('user', __name__)

@user_bp.route('/login', methods=['POST'])
def login_route():
    return UserController.login()

@user_bp.route("/pump", methods=['POST'], endpoint='pump_action')
@token_guard
def handle_pump_action():
    return UserController.pump_action()

@user_bp.route("/pump", methods=['GET'], endpoint='pump_status')
@token_guard
def get_pump_status():
    return UserController.get_pump_status()