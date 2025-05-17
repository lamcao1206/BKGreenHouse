import paho.mqtt.client as mqtt
import certifi
import ssl
import logging
from threading import Lock


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MQTTClient:
    def __init__(self, queue, username, key, feeds, idle):
        self.queue = queue
        self.username = username
        self.feeds = feeds
        self.key = key
        self.client = None
        self.publish_lock = Lock()
        self.idle = idle
        self._setup_client()

    def _setup_client(self):
        self.client = mqtt.Client(client_id="greenhouse_client", protocol=mqtt.MQTTv311)
        self.client.username_pw_set(self.username, self.key)

        self.client.user_data_set({
            'queue': self.queue,
            'username': self.username,
            'feeds': self.feeds
        })

        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        self.client.on_publish = self.on_publish

        self.client.tls_set(
            ca_certs=certifi.where(),
            cert_reqs=ssl.CERT_REQUIRED,
            tls_version=ssl.PROTOCOL_TLS
        )

    def on_connect(self, client, userdata, flags, rc, properties=None):
        logger.info("Connected to Adafruit IO with result code %s", rc)
        for feed in userdata['feeds']:
            client.subscribe(f"{userdata['username']}/feeds/{feed}")

    def on_message(self, client, userdata, msg):
        topic = msg.topic.split('/')[-1]
        payload = msg.payload.decode()
        logger.info("Received %s: %s", topic, payload)
        userdata['queue'].put({'topic': topic, 'data': payload})
        logger.info("Queue size after put: %d", userdata['queue'].qsize())

    def on_publish(self, client, userdata, mid):
        logger.info("Message published with mid: %s", mid)

    def publish(self, feed, value):
        with self.publish_lock:
            try:
                topic = f"{self.username}/feeds/{feed}"
                result = self.client.publish(topic, value)
                if result.rc == mqtt.MQTT_ERR_SUCCESS:
                    logger.info("Published to %s: %s", topic, value)
                    return True
                else:
                    logger.error("Publish failed with rc: %s", result.rc)
                    return False
            except Exception as e:
                logger.error("Publish error: %s", e)
                return False

    def start(self):
        try:
            self.client.connect("io.adafruit.com", 8883)
            self.client.loop_start()
            return True
        except Exception as e:
            logger.error("MQTT connection failed: %s", e)
            return False
    
    def close(self):
        try:
            self.client.loop_stop()
            self.client.disconnect()
            logger.info("MQTT client stopped and disconnected.")
        except Exception as e:
            logger.error("Error stopping MQTT client: %s", e)
