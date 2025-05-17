import time
import json
from datetime import datetime
from app.utils.db import get_db

class SensorController:
    @staticmethod
    def update_or_insert_record(topic, value):
        today = datetime.now().strftime('%Y-%m-%d')

        column_map = {
            'temperature': ('min_temperature', 'max_temperature'),
            'soil_moisture': ('min_soil_moisture', 'max_soil_moisture'),
            'humidity': ('min_humidity', 'max_humidity'),
        }
        if topic not in column_map:
            return

        min_col, max_col = column_map[topic]
        with get_db() as db:
            query = 'SELECT * FROM daily_records WHERE date = ?'
            row = db.execute(query, (today,)).fetchone()

            if row is None:
                insert_query = f'''
                    INSERT INTO daily_records (date, {min_col}, {max_col})
                    VALUES (:date, :min_val, :max_val)
                '''
                db.execute(insert_query, {
                    'date': today,
                    'min_val': value,
                    'max_val': value
                })
            else:
                update_needed = False
                updates = {}
                if row[min_col] is None or value < row[min_col]:
                    updates[min_col] = value
                    update_needed = True
                if row[max_col] is None or value > row[max_col]:
                    updates[max_col] = value
                    update_needed = True

                if update_needed:
                    set_clause = ", ".join([f"{col} = :{col}" for col in updates])
                    updates["date"] = today
                    update_query = f'''
                        UPDATE daily_records
                        SET {set_clause}
                        WHERE date = :date
                    '''
                    db.execute(update_query, updates)
            db.commit()

    @staticmethod
    def get_sensor_stream(data_queue, sensor_topic):
        try:
            while True:
                if not data_queue.empty():
                    data = data_queue.get()
                    if data['topic'] == sensor_topic:
                        if (sensor_topic != 'ai'):
                            value = float(data.get('data'))
                            SensorController.update_or_insert_record(sensor_topic, value)
                        yield f"data: {json.dumps(data)}\n\n"
                else:
                    yield "data: {\"connection\": \"alive\"}\n\n"
                time.sleep(1)
        except Exception as e:
            print(e)
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    @staticmethod
    def get_temperature_stream(data_queue):
        return SensorController.get_sensor_stream(data_queue, 'temperature')

    @staticmethod
    def get_soil_moisture_stream(data_queue):
        return SensorController.get_sensor_stream(data_queue, 'soil_moisture')

    @staticmethod
    def get_light_stream(data_queue):
        return SensorController.get_sensor_stream(data_queue, 'light')

    @staticmethod
    def get_humidity_stream(data_queue):
        return SensorController.get_sensor_stream(data_queue, 'humidity')
    
    @staticmethod
    def get_ai_output_stream(data_queue):
        return SensorController.get_sensor_stream(data_queue, 'ai')
