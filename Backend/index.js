
// ????package import 
import express from 'express';
const  app= express();
import cookieParser from 'cookie-parser';

// Make sure cookie-parser middleware is used
app.use(cookieParser());

// Example to log cookies
// console.log('Cookies:', req.cookies);




//!!!!env config
import dotenv from 'dotenv'
dotenv.config()



//!!!! connect database
import Connectdb from './config/db.js';
Connectdb();

//! middleware cors 
import cors from 'cors';

app.use(cors({
    origin:[process.env.Frontend_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH', 'OPTIONS'], // Allow these methods
    credentials:true
}));
import morgan from 'morgan';
app.use(morgan("dev"));

//!!!!1middleware hai when we receive json data then we need to inform the application that 
// !! we use json data so it deal with json data 
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))




//???



//???import routtes file 

import registerroutes from './routes/registerroute.js'
import weatherroutes from './routes/weatherroutes.js'; // Make sure this is lowercase

import errormiddleware from './middleware/errormiddleware.js';


//!!!!    routing 
app.use('/api/v1/reg', registerroutes)  // this is for registration login logout 
app.use('/api/v1', weatherroutes);  // Assuming all weather routes are under '/api/v1'






app.use(errormiddleware);


// !!!!!!Server
const Port= process.env.PORT||4000
app.listen(Port, ()=>{
    console.log(`Node server is running in ${process.env.Dev_mode} on port no ${Port}`)
})