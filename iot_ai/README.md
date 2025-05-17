# iot-ai-tree
Project about tree condition classification

## Connection
- Connect to adafruit server and get data from it
- Send data after prediction to a feed in AdaFruit.io

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
AIO_FEED_ID=<list_of_feeds>
AIO_USERNAME=<username_adafruit>
AIO_KEY=<password_adafruit>
AIO_RESULT_FEED=<destination_topic>
```

Run the program for model training
```
python3 model.py
```

Run the program for connecting and predicting (sending)
```
python3 connect_predict.py
```


