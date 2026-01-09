// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory store (Replace with MongoDB/PostgreSQL for production)
let userStore = {
  preferences: {
    distanceRange: 5,
    safetyMode: true,
    socialAlerts: true,
    natureMode: false,
    vehicleAlerts: true
  },
  emergencyContacts: [
    { name: "Emergency Dispatch", phone: "911" }
  ]
};

// GET current user configuration
app.get('/api/config', (req, res) => {
  res.status(200).json(userStore.preferences);
});

// PATCH update specific settings
app.patch('/api/config', (req, res) => {
  userStore.preferences = { ...userStore.preferences, ...req.body };
  res.status(200).json({ message: "Settings synced successfully", data: userStore.preferences });
});

// POST SOS Trigger
app.post('/api/sos', (req, res) => {
  const { timestamp, location } = req.body;
  // logic for SMS/Twilio integration would trigger here
  console.log(`[ALERT] SOS Signal received at ${timestamp} from ${location || 'Unknown'}`);
  res.status(201).json({ status: "SENT", message: "Emergency services notified." });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Assistive API running on port ${PORT}`));