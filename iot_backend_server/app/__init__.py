import os
import logging
from flask import Flask
from flask_cors import CORS
from queue import Queue
from dotenv import load_dotenv
from app.utils.mqtt_client import MQTTClient
from app.utils.db import init_db, close_db
from app.routes import register_routes

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

def create_app():
    app = Flask(__name__)
    
    client_host = os.getenv("CLIENT_HOST")
    logger.info("Clienthost %s", client_host)
    CORS(app, resources={r"*": {"origins": client_host}}, supports_credentials=True)

    
    app.config['AIO_USERNAME'] = os.getenv('AIO_USERNAME')
    app.config['AIO_KEY'] = os.getenv('AIO_KEY')
    app.config['AIO_FEEDS'] = os.getenv('AIO_FEEDS', 'temperature,soil_moisture').split(',')
    
    
    with app.app_context():
        init_db()
        app.data_queue = Queue()
        app.mqtt_client = MQTTClient(
            queue=app.data_queue, 
            username=app.config['AIO_USERNAME'], 
            key=app.config['AIO_KEY'], 
            feeds=app.config['AIO_FEEDS'],
            idle=os.getenv('IDLE', 10),
        )
        
        if not app.mqtt_client.start():
            app.logger.error('Failed to connect to Adafruit.IO')
        
        register_routes(app)
            
    return app