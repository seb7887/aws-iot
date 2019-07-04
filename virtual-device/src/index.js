require('dotenv').config();

const path = require('path');
const awsIot = require('aws-iot-device-sdk');

const thingName = 'weather-device';
const DELAY = 15;
const TAG = `[${thingName}]>>>>>`;

const keyPath = path.join(__dirname, '../certs/87a8f482a7-private.pem.key');
const certPath = path.join(
  __dirname,
  '../certs/87a8f482a7-certificate.pem.crt'
);
const caPath = path.join(__dirname, '../certs/AmazonRootCA1.pem');

console.log(TAG, 'Connecting...');

const thingShadow = awsIot.thingShadow({
  keyPath,
  certPath,
  caPath,
  clientId: thingName,
  host: process.env.HOST,
  port: process.env.PORT,
  region: process.env.REGION,
  debug: false // optional to see logs on console
});

const fetchData = () => {
  const temp = Math.random() * 100;
  const hum = Math.random() * 100;

  return {
    temp,
    hum
  };
};

const sendData = () => {
  const DHT11State = {
    state: {
      desired: fetchData()
    }
  };

  console.log(TAG, 'Sending data...', DHT11State);

  const clientTokenUpdate = thingShadow.update(thingName, DHT11State);
  if (clientTokenUpdate === null) {
    console.log(TAG, 'Shadow update failed, operation still in progress');
  } else {
    console.log(TAG, 'Shadow update success');
  }

  // keep sending the data every 30 seconds
  console.log(TAG, 'Reading data again in 30 seconds...');
  setTimeout(sendData, 30000); // 30 seconds
};

thingShadow.on('connect', () => {
  console.log(TAG, 'Connected');
  thingShadow.register(thingName, {}, () => {
    console.log(TAG, 'Registered');
    console.log(TAG, `Reading data in ${DELAY} seconds`);
    setTimeout(sendData, 30000); // 30 seconds
  });
});

thingShadow.on('status', (thingName, stat, clientToken, stateObj) => {
  console.log(`Received ${stat} on ${thingName}: ${JSON.stringify(stateObj)}`);
});

thingShadow.on('delta', (thingName, stateObj) => {
  console.log(`Received data on ${thingName}: ${JSON.stringify(stateObj)}`);
});

thingShadow.on('timeout', (thingName, clientToken) => {
  console.log(`Received timeout on ${thingName} with token ${clientToken}`);
});
