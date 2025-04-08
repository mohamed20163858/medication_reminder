// src/services/twilioClient.js
const Twilio = require("twilio");
const { twilio } = require("../utils/env");

// Instantiate Twilio REST client
const client = new Twilio(twilio.accountSid, twilio.authToken);

module.exports = client;
