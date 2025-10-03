const mongoose = require("mongoose");

const SensorDataSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  moisture: Number,
  nitrogen: Number,
  phosphorus: Number,
  potassium: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SensorData", SensorDataSchema);
