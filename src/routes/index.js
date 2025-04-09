// src/routes/index.js
const express = require("express");
const { triggerCall } = require("../controllers/callController");
const {
  handleVoice,
  handleVoiceResponse,
  // handleStatusCallback will come later
} = require("../controllers/webhookController");

const router = express.Router();

router.post("/calls", triggerCall);
router.post("/voice", handleVoice);
router.post("/voice-response", handleVoiceResponse);

module.exports = router;
