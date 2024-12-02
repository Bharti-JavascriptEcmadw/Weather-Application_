
// ????package import 
import express from 'express';
const  app= express();
import cookieParser from 'cookie-parser';
app.use(cookieParser());

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

app.use(express.json()); 
app.use(express.urlencoded({extended:true}))
 

import registerroutes from './routes/registerroute.js'
import weatherroutes from './routes/weatherroutes.js'; 

app.use('/api/v1/reg', registerroutes) 
app.use('/api/v1', weatherroutes);  



// !!!!!!Server
const Port= process.env.PORT||4000
app.listen(Port, ()=>{
    console.log(`Node server is running in ${process.env.Dev_mode} on port no ${Port}`)
})