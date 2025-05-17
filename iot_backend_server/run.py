from app.utils.load_config import get_flask_config
from app import create_app

def main():
	debug, host, port = get_flask_config()
	app = create_app()
	app.run(debug=debug, host=host, port=port)

if __name__ == "__main__":
    main()