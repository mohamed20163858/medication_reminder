// src/routes/index.js
const express = require("express");
const { triggerCall } = require("../controllers/callController");
const {
  handleVoice,
  handleVoiceResponse,
  handleStatusCallback,
} = require("../controllers/webhookController");

const router = express.Router();

router.post("/calls", triggerCall);
router.post("/voice", handleVoice);
router.post("/voice-response", handleVoiceResponse);
router.post("/status-callback", handleStatusCallback);

module.exports = router;
