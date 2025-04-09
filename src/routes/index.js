// src/routes/index.js
const express = require("express");
const { triggerCall } = require("../controllers/callController");
const { handleVoice } = require("../controllers/webhookController");
// (We’ll add more handlers later)
// const { handleVoiceResponse, handleStatusCallback } = require('../controllers/webhookController');

const router = express.Router();

router.post("/calls", triggerCall);
router.post("/voice", handleVoice);

module.exports = router;
