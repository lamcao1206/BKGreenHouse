from dotenv import load_dotenv
import os
import socket
import sys 

def get_local_ip():
    if len(sys.argv) >= 2 and sys.argv[1] == 'dev':
        return '127.0.0.1'
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.settimeout(0)
    try:
        s.connect(('8.8.8.8', 80))
        local_ip = s.getsockname()[0]
    except Exception:
        local_ip = '127.0.0.1'
    finally:
        s.close()
    return local_ip

def get_flask_config():
    load_dotenv()
    debug = os.getenv("FLASK_DEBUG", "False").lower() == "true"
    port = int(os.getenv("FLASK_RUN_PORT", 3000))
    host = get_local_ip()
    
    return debug, host, port
