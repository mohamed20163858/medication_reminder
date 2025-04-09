// src/services/logger.js

/**
 * Simple call logger.
 * @param {{callSid: string, status: string, speechText?: string}} params
 */
function logCall({ callSid, status, speechText }) {
  console.log(
    `[CALL LOG] SID=${callSid} STATUS=${status}` +
      (speechText ? ` RESPONSE="${speechText}"` : "")
  );
}

module.exports = { logCall };
