// src/app.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Mount our API routes
app.use("/", routes);

// A simple health‑check route
app.get("/", (req, res) => {
  res.send("✅ Medication Reminder System is running");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  //  console.log("TWILIO_SID=", process.env.TWILIO_ACCOUNT_SID); // should print your SID
  console.log(`🚀 Listening on port ${PORT}`);
});
