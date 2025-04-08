// quick sanity check in app.js or a REPL:
const client = require("./src/services/twilioClient");
console.log("Twilio client loaded:", typeof client.calls.create === "function");
