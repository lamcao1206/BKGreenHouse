from flask import Blueprint, Response, current_app
from app.controllers.sensor_controller import SensorController

sensor_bp = Blueprint("sensor", __name__)

@sensor_bp.route("/temp/stream", methods=['GET'])
def temperature_stream():
    return Response(
        SensorController.get_temperature_stream(current_app.data_queue), 
        mimetype="text/event-stream"
    )

@sensor_bp.route("/soil/stream", methods=['GET'])
def soil_moisture_stream():
    return Response(
        SensorController.get_soil_moisture_stream(current_app.data_queue), 
        mimetype="text/event-stream"
    )

@sensor_bp.route("/light/stream", methods=['GET'])
def light_stream(): 
    return Response(
        SensorController.get_light_stream(current_app.data_queue), 
        mimetype="text/event-stream"
    )
    
@sensor_bp.route("/humidity/stream", methods=['GET'])
def humidity_stream():
    return Response(
        SensorController.get_humidity_stream(current_app.data_queue), 
        mimetype="text/event-stream"
    )

@sensor_bp.route("/ai/stream", methods=['GET'])
def ai_stream():
    return Response(
        SensorController.get_ai_output_stream(current_app.data_queue), 
        mimetype="text/event-stream"
    )