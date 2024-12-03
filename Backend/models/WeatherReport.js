import mongoose from 'mongoose';

const weatherReportSchema = new mongoose.Schema(
  {
    location: {
      name: { type: String, required: true },
      country: { type: String, required: true },
      region: { type: String },
      lat: { type: Number },
      lon: { type: Number },
    },
    current: {
      temperature: { type: Number },
      weather_descriptions: { type: [String] },
      feelslike: { type: Number },
      wind_speed: { type: Number },
      humidity: { type: Number },
      pressure: { type: Number },
      visibility: { type: Number },
      weather_icons: { type: [String] },
      observation_time: { type: String },
      cloudcover: { type: Number },
    },
    search: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    name: {
      type: String, // This will hold the name of the user who created the report
    },
  },
  { timestamps: true }
);

export default mongoose.model('WeatherReport', weatherReportSchema);
