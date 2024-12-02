// // routes/weatherroutes.

import express from 'express';
import auth from '../middleware/auth.js'

import { searchWeather, getWeatherReports} from '../controller/weatherController.js'; // Importing both controllers

const router = express.Router();


router.get('/weather/:city', searchWeather); // `/api/v1/weather/:city` route

router.get('/w/report',  getWeatherReports); // `/api/v1/weather/:city` route

  
export default router;

