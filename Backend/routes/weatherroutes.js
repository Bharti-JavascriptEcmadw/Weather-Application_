// // routes/weatherroutes.

import express from 'express';
import { searchWeather, getWeatherReports} from '../controller/weatherController.js'; // Importing both controllers

const router = express.Router();

// Route for searching weather data by city
router.get('/weather/:city', searchWeather); // `/api/v1/weather/:city` route

// Route for fetching all stored weather reports from MongoDB
router.get('/w/report', getWeatherReports); // `/api/v1/weather/:city` route

  
export default router;

