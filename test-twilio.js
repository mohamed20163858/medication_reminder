// test-twilio.js
const client = require("./src/services/twilioClient");
client.incomingPhoneNumbers
  .list({ phoneNumber: process.env.TWILIO_PHONE_NUMBER, limit: 1 })
  .then((numbers) => console.log(numbers[0]))
  .catch(console.error);
