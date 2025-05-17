import sqlite3
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_PATH = os.getenv('DATABASE_PATH', 'database.db')

def get_db():
    db = sqlite3.connect(DATABASE_PATH, check_same_thread=False)
    db.row_factory = sqlite3.Row
    return db

def close_db(db=None):
    """
    Close the provided database connection if it exists.
    """
    if db is not None:
        db.close()

def init_db():
    """
    Initialize the database without relying on Flask context.
    """
    db = get_db()
    try:
        db.execute('''
            CREATE TABLE IF NOT EXISTS daily_records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT UNIQUE DEFAULT (DATE('now')),  
                max_temperature REAL DEFAULT 0,
                min_temperature REAL DEFAULT 0,
                max_soil_moisture REAL DEFAULT 0,
                min_soil_moisture REAL DEFAULT 0,
                max_humidity REAL DEFAULT 0,
                min_humidity REAL DEFAULT 0
            )
        ''')
        db.commit()
    except sqlite3.Error as e:
        print(f"Database initialization failed: {e}")
        raise
    finally:
        close_db(db)