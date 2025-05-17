# iot-ai-tree
Project about tree condition classification

## Connection
- Connect to adafruit server and get data from it
- Store data in a centralized file

## Main program
- Build an AI program to classify appropriate condition if a plant is good.

## Commands
Set up virtual environment for Python

```
python3.11 -m venv myenv
source myenv/bin/activate
pip install -r requirements.txt
```

Add .env file and add the information like the format below:

```
AIO_FEED_ID=<string without double quotes>,<string without double quotes>,<string without double quotes>
AIO_USERNAME=<string without double quotes>
AIO_KEY=<string without double quotes>
```

Run the program

```
python3 main.py
```


