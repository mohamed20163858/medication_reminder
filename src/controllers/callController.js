// src/controllers/callController.js
const client = require("../services/twilioClient");
const { twilio, publicUrl } = require("../utils/env");
const { logCall } = require("../services/logger");

async function triggerCall(req, res, next) {
  try {
    const { to } = req.body;
    if (!to)
      return res.status(400).json({ error: '"to" phone number is required' });

    // Use PUBLIC_URL if set, otherwise fallback to host
    const baseUrl = publicUrl || `${req.protocol}://${req.get("host")}`;

    const call = await client.calls.create({
      url: `${baseUrl}/voice`,
      to,
      from: twilio.phoneNumber,
      machineDetection: "DetectMessageEnd",
      statusCallback: `${baseUrl}/status-callback`,
      statusCallbackEvent: ["completed"],
    });

    console.log(`📞 Outbound call triggered. SID=${call.sid}`);
    res.json({ callSid: call.sid });
  } catch (err) {
    next(err);
  }
}

module.exports = { triggerCall };
