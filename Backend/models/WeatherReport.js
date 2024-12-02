import mongoose from 'mongoose';

const weatherReportSchema = new mongoose.Schema({
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
    observation_time: { type: String },
    weather_icons: { type: [String] },
  },
  date: { type: Date, default: Date.now },
});

// const WeatherReport = mongoose.model('WeatherReport', weatherReportSchema);

// export default WeatherReport;
export default mongoose.model("WeatherReport", weatherReportSchema)

