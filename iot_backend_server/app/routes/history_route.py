from flask import Blueprint, jsonify
from app.controllers.history_controller import HistoryController

history_bp = Blueprint("history", __name__)

@history_bp.route("/temp", methods=["GET"])
def temperature_history():
    response, status_code = HistoryController.get_temperature_history()
    return jsonify(response), status_code

@history_bp.route("/soil", methods=["GET"])
def soil_moisture_history():
    response, status_code = HistoryController.get_soil_moisture_history()
    return jsonify(response), status_code

@history_bp.route("/humidity", methods=["GET"])
def humidity_history():
    response, status_code = HistoryController.get_humidity_history()
    return jsonify(response), status_code

@history_bp.route("/all", methods=["GET"])
def all_records():
    response, status_code = HistoryController.get_all_records()
    return jsonify(response), status_code
