// src/routes/index.js
const express = require("express");
const { triggerCall } = require("../controllers/callController");
// We’ll add more controllers later:
// const { handleVoice, handleVoiceResponse, handleStatusCallback } = require('../controllers/webhookController');

const router = express.Router();

// Trigger outbound call
router.post("/calls", triggerCall);

module.exports = router;
