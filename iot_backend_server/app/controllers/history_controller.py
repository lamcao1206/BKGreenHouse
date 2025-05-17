from flask import current_app
from app.models.record_model import RecordModel  # Adjust path as needed

class HistoryController:
    @staticmethod
    def get_all_records():
        try:
            data = RecordModel.get_all_records()
            return {
                "status": "success",
                "data": data
            }, 200
        except Exception as e:
            current_app.logger.error(f"Error fetching all records: {e}")
            return {
                "status": "error",
                "message": "Failed to retrieve all records."
            }, 500

    @staticmethod
    def get_temperature_history():
        try:
            data = RecordModel.get_temperature_history()
            return {
                "status": "success",
                "data": data
            }, 200
        except Exception as e:
            current_app.logger.error(f"Error fetching temperature history: {e}")
            return {
                "status": "error",
                "message": "Failed to retrieve temperature history."
            }, 500

    @staticmethod
    def get_soil_moisture_history():
        try:
            data = RecordModel.get_soil_moisture_history()
            return {
                "status": "success",
                "data": data
            }, 200
        except Exception as e:
            current_app.logger.error(f"Error fetching soil moisture history: {e}")
            return {
                "status": "error",
                "message": "Failed to retrieve soil moisture history."
            }, 500

    @staticmethod
    def get_humidity_history():
        try:
            data = RecordModel.get_humidity_history()
            return {
                "status": "success",
                "data": data
            }, 200
        except Exception as e:
            current_app.logger.error(f"Error fetching humidity history: {e}")
            return {
                "status": "error",
                "message": "Failed to retrieve humidity history."
            }, 500