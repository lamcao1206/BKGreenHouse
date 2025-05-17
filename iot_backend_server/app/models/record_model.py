from app.utils.db import get_db

class RecordModel:
    @staticmethod
    def get_all_records():
        db = get_db()
        query = '''
            SELECT *
            FROM daily_records
            ORDER BY date DESC
        '''
        result = db.execute(query).fetchall()
        return [
            {
                "id": row["id"],
                "date": row["date"],
                "max_temperature": row["max_temperature"],
                "min_temperature": row["min_temperature"],
                "max_soil_moisture": row["max_soil_moisture"],
                "min_soil_moisture": row["min_soil_moisture"],
                "max_humidity": row["max_humidity"],
                "min_humidity": row["min_humidity"]
            }
            for row in result
        ]

    @staticmethod
    def get_temperature_history():
        db = get_db()
        query = '''
            SELECT date, max_temperature, min_temperature
            FROM daily_records
            ORDER BY date DESC
        '''
        result = db.execute(query).fetchall()
        return [
            {
                "date": row["date"],
                "max_temperature": row["max_temperature"],
                "min_temperature": row["min_temperature"]
            }
            for row in result
        ]

    @staticmethod
    def get_soil_moisture_history():
        db = get_db()
        query = '''
            SELECT date, max_soil_moisture, min_soil_moisture
            FROM daily_records
            ORDER BY date DESC
        '''
        result = db.execute(query).fetchall()
        return [
            {
                "date": row["date"],
                "max_soil_moisture": row["max_soil_moisture"],
                "min_soil_moisture": row["min_soil_moisture"]
            }
            for row in result
        ]

    @staticmethod
    def get_humidity_history():
        db = get_db()
        query = '''
            SELECT date, max_humidity, min_humidity
            FROM daily_records
            ORDER BY date DESC
        '''
        result = db.execute(query).fetchall()
        return [
            {
                "date": row["date"],
                "max_humidity": row["max_humidity"],
                "min_humidity": row["min_humidity"]
            }
            for row in result
        ]

    @staticmethod
    def insert_record(data):
        db = get_db()
        query = '''
            INSERT INTO daily_records (
                date, max_temperature, min_temperature,
                max_soil_moisture, min_soil_moisture,
                max_humidity, min_humidity
            ) VALUES (
                :date, :max_temperature, :min_temperature,
                :max_soil_moisture, :min_soil_moisture,
                :max_humidity, :min_humidity
            )
        '''
        db.execute(query, data)
        db.commit()

    @staticmethod
    def update_record(date, attr_name, data):
        db = get_db()
        query = f'''
            UPDATE daily_records
            SET {attr_name} = :value
            WHERE date = :date
        '''
        db.execute(query, {"value": data, "date": date})
        db.commit()
