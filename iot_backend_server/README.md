# IOT Backend Server

This is the backend module for the Multidisciplinary Project CO3109

## Functionality

- Connect to Adafruit to get the data from the feed `ai`, `temperature`, `soil_moisture`,`humidity` and `light`
- Sending real-time data to client through SSE protocol
- Storing min and max value for each data record group by date.

## Commands

Set up virtual environment for Python. For Windows, check out how to set python virtual venv in [here](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)

```
python3.12 -m venv myenv
source myenv/bin/activate
pip install -r requirements.txt
```

Create .env file and adding information like the `.env.sample`:

```
# Flask configuration
FLASK_DEBUG=False  # Set to True for development, False for production
FLASK_RUN_PORT=3000  # Port for running the Flask server
CLIENT_HOST=http://<your-client-host>:<port>  # Replace with your client host URL

# Admin credentials
ADMIN_EMAIL=<your-admin-email>  # Replace with the admin email
ADMIN_PASSWORD=<your-admin-password>  # Replace with the admin password
JWT_SECRET_KEY=<your-jwt-secret-key>  # Replace with a secure JWT secret key

# Adafruit IO configuration
AIO_USERNAME=<your-adafruit-username>  # Replace with your Adafruit IO username
AIO_KEY=<your-adafruit-key>  # Replace with your Adafruit IO key
AIO_HOST=io.adafruit.com  # Adafruit IO host
AIO_FEEDS=temperature,soil_moisture,pump,light,bkgreenhouse,ai,humidity  # List of Adafruit IO feeds
AIO_PORT=1883  # Port for Adafruit IO (use 8883 for SSL)
```

Run the program

- In case you are running in localhost dev-mode:

```
python3 run.py dev
```

- If you want to run the server on the local IP address:

```
python3 run.py
```
