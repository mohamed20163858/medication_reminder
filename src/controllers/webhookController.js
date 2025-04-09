// src/controllers/webhookController.js
const {
  twiml: { VoiceResponse },
} = require("twilio");
const { logCall } = require("../services/logger");

/**
 * POST /voice
 * Twilio will POST here when the outbound call is answered
 */
function handleVoice(req, res) {
  console.log("🔍 /voice body:", req.body);

  const response = new VoiceResponse();

  // If Twilio’s Answering Machine Detection reports voicemail…
  if (req.body.AnsweredBy && req.body.AnsweredBy.startsWith("machine")) {
    // Leave a voicemail message
    response.say(
      "We called to check on your medication but could not reach you. " +
        "Please call us back or take your medications if you have not done so."
    );
    // Twilio will record this as the call; no <Gather> here.
    res.type("text/xml").send(response.toString());
    return;
  }

  // Otherwise, live person—prompt for speech
  const gather = response.gather({
    input: "speech",
    action: "/voice-response", // Twilio will POST here after speech is captured
    speechTimeout: "auto",
  });

  gather.say(
    "Hello, this is a reminder from your healthcare provider to confirm your " +
      "medications for the day. Please confirm if you have taken your Aspirin, " +
      "Cardivol, and Metformin today."
  );

  // If no speech is detected, re-prompt once
  response.redirect("/voice");

  res.type("text/xml").send(response.toString());
}

/**
 * POST /voice-response
 * Twilio will POST here after gathering speech
 */
function handleVoiceResponse(req, res) {
  const response = new VoiceResponse();

  const callSid = req.body.CallSid;
  const speech = req.body.SpeechResult || "";
  // Log the answered call and the patient's transcript
  logCall({
    callSid,
    status: "answered",
    speechText: speech,
  });

  // Thank the patient
  response.say("Thank you. Have a nice day.");

  res.type("text/xml").send(response.toString());
}

module.exports = {
  handleVoice,
  handleVoiceResponse,
  // we'll add handleStatusCallback next
};
