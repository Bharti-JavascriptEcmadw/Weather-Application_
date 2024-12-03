// import axios from 'axios';
// import dotenv from 'dotenv';
// import WeatherReport from '../models/WeatherReport.js'; // Your WeatherReport model

// dotenv.config();

// const WEATHER_API_KEY = process.env.WEATHER_API_KEY; // Your weather API key
// const WEATHER_API_URL = "http://api.weatherstack.com/current"; // Update with the correct weather API URL

// // Function to search weather data by city
// export const searchWeather = async (req, res) => {
//   const { city } = req.params; // Get city from URL parameter

//   if (!city) {
//     return res.status(400).json({ message: 'City is required.' });
//   }

//   try {
//     // Fetch weather data from the external weather API
//     const response = await axios.get(WEATHER_API_URL, {
//       params: {
//         access_key: WEATHER_API_KEY,
//         query: city,
//       },
//     });

//     // Check if the response contains valid weather data
//     if (!response.data || !response.data.location) {
//       return res.status(404).json({ message: 'City not found.' });
//     }

//     // Extract necessary weather information from the response
//     const weatherData = {
//       location: {
//         name: response.data.location.name,
//         country: response.data.location.country,
//         region: response.data.location.region,
//         lat: response.data.location.lat,
//         lon: response.data.location.lon,

      
//       },
//       current: {
//         temperature: response.data.current.temperature,
//         weather_descriptions: response.data.current.weather_descriptions[0], // First description
//         feelslike: response.data.current.feelslike,
//         wind_speed: response.data.current.wind_speed,
//         humidity: response.data.current.humidity,
//         pressure: response.data.current.pressure,
//         cloudcover: response.data.current.cloudcover,
//         visibility: response.data.current.visibility,
//         weather_icons: response.data.current.weather_icons[0], // URL to weather icon
//         observation_time: response.data.current.observation_time,
//         is_day: response.data.current.is_day,
//       },

    
//     };

//     // Save the weather data into MongoDB
//     const weatherReport = new WeatherReport(weatherData);
//     await weatherReport.save();

//     // Return the weather data as the response
//     return res.status(200).json(weatherData);
//   } catch (error) {
//     // Log the error for debugging purposes
//     console.error('Error fetching weather data:', error.message);

//     // Return a more detailed error message
//     return res.status(500).json({ message: 'Error fetching weather data', error: error.message });
//   }
// };
// // Function to get all weather reports from the database
// // Import the WeatherReport model

// // Function to fetch all weather reports from MongoDB
// export const getWeatherReports = async (req, res) => {
//   try {
//     // Fetch all weather reports from MongoDB, sorted by date (latest first)
//     const reports = await WeatherReport.find().sort({ date: -1 });

//     // If reports are found, send them back to the frontend
//     if (reports.length > 0) {
//       console.log('Weather reports fetched:', reports); // Log the reports
//       return res.status(200).json(reports); // Send reports back in the response
//     } else {
//       console.log('No weather reports found');
//       return res.status(404).json({ message: 'No weather reports found' });
//     }
//   } catch (error) {
//     console.error('Error fetching weather reports:', error);
//     return res.status(500).json({ message: 'Error fetching weather reports' });
//   }
// };
import axios from 'axios';
import dotenv from 'dotenv';
import WeatherReport from '../models/WeatherReport.js';

dotenv.config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = "http://api.weatherstack.com/current";

// Function to search weather data by city and associate it with the user
export const searchWeather = async (req, res) => {
  const { city } = req.params;  // Get city from request parameters

  if (!city) {
    return res.status(400).json({ message: 'City is required.' });
  }

  // Check if req.user is available
  if (!req.user || !req.user._id) {
    return res.status(400).json({ message: 'User is not authenticated.' });
  }

  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        access_key: WEATHER_API_KEY,
        query: city,
      },
    });

    // Check if the response contains valid weather data
    if (!response.data || !response.data.location) {
      return res.status(404).json({ message: 'City not found or invalid response from weather API.' });
    }

    // Extract necessary weather information from the response
    const weatherData = {
      location: {
        name: response.data.location.name,
        country: response.data.location.country,
        region: response.data.location.region,
        lat: response.data.location.lat,
        lon: response.data.location.lon,
      },
      current: {
        temperature: response.data.current.temperature,
        weather_descriptions: response.data.current.weather_descriptions[0],  // First description
        feelslike: response.data.current.feelslike,
        wind_speed: response.data.current.wind_speed,
        humidity: response.data.current.humidity,
        pressure: response.data.current.pressure,
        cloudcover: response.data.current.cloudcover,
        visibility: response.data.current.visibility,
        weather_icons: response.data.current.weather_icons[0],  // URL to weather icon
        observation_time: response.data.current.observation_time,
        is_day: response.data.current.is_day,
      },
      createdBy: req.user._id,  // Save the user ID
      name: req.user.name,      // Store the user's name
      search: new Date(),       // Store the current timestamp of the search
    };

    // Save the weather data into MongoDB
    const weatherReport = new WeatherReport(weatherData);
    await weatherReport.save();

    // Return the weather data as the response
    return res.status(200).json(weatherData);

  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return res.status(500).json({ message: 'Error fetching weather data', error: error.message });
  }
};

// Function to fetch all weather reports
export const getWeatherReports = async (req, res) => {
  try {
    // Fetch all weather reports from MongoDB, sorted by date (latest first)
    const reports = await WeatherReport.find().sort({ createdAt: -1 });

    // If reports are found, send them back to the frontend
    if (reports.length > 0) {
      console.log('Weather reports fetched:', reports); // Log the reports
      return res.status(200).json(reports); // Send reports back in the response
    } else {
      console.log('No weather reports found');
      return res.status(404).json({ message: 'No weather reports found' });
    }
  } catch (error) {
    console.error('Error fetching weather reports:', error);
    return res.status(500).json({ message: 'Error fetching weather reports' });
  }
};
