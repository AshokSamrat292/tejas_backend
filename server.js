const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000; // ✅ this is important on Render

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let latestData = {};

app.post('/api/sensors', (req, res) => {
  const { ldr, temp, smoke } = req.body;
  latestData = {
    ldr: parseInt(ldr),
    temp: parseInt(temp),
    smoke: parseInt(smoke),
    fireDetected: parseInt(smoke) > 500 || parseInt(ldr) < 200 || parseInt(temp) > 50,
    timestamp: new Date().toLocaleString()
  };
  console.log("Received sensor data:", latestData);
  res.sendStatus(200);
});

app.get('/api/sensors', (req, res) => {
  res.json(latestData);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
