import jwt
from datetime import datetime, timedelta, timezone
from flask import jsonify, request, current_app
import os
import requests

class UserController:
    @staticmethod
    def login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if email == os.getenv('ADMIN_EMAIL') and password == os.getenv('ADMIN_PASSWORD'):
            token = jwt.encode({
                'email': email,
                'exp': datetime.now(timezone.utc) + timedelta(hours=1)
            }, os.getenv('JWT_SECRET_KEY'), algorithm="HS256")
            return jsonify({'token': token}), 200

        return jsonify({'message': 'Invalid credentials!'}), 401

    @staticmethod
    def pump_action():
        data = request.get_json()
        action = int(data.get('action'))
        
        mqtt_client = current_app.mqtt_client
        success = mqtt_client.publish('pump', 1)
        
        
        if success:
            return jsonify({'status': 200, 'action': action}), 200
        else:
            return jsonify({'status': 500, 'action': action}), 500
        
    @staticmethod
    def get_pump_status():
        try:
            response = requests.get(
                f"https://io.adafruit.com/api/v2/{os.getenv('AIO_USERNAME')}/feeds/pump/data/last",
                headers={'X-AIO-Key': os.getenv('AIO_KEY')}
            )
            if response.status_code == 200:
                return jsonify({
                    'status': 200,
                    'value': response.json()['value']
                })
            else:
                return jsonify({
                    'status': 502,
                    'message': f'Failed to fetch pump status from Adafruit IO: {response.status_code}'
                }), 502
        except requests.RequestException as e:
            return jsonify({
                'status': 503,
                'message': f'Error connecting to Adafruit IO: {str(e)}'
            }), 503