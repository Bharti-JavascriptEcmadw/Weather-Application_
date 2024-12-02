// models/Log.js
import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true, // Automatically removes extra spaces from the city name
  },
  user: {
    type: String,
    required: true, // Assuming the user is required for logging
  },
  searchDate: {
    type: Date,
    default: Date.now, // Automatically sets the date when the log is created
  },
});

const Log = mongoose.model('Log', logSchema);

export default Log;
