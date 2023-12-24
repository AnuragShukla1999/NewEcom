import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import cors from 'cors';



import userRouter from './Routes/userRoute.js'


// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB!')
    })
    .catch((err) => {
        console.log(err)
    })

//localhost:4000/api/user/signup


const app = express();

app.use(express.json());


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Enable credentials such as cookies, authorization headers, etc.
  }));


// Routes
app.use('/api/user', userRouter)


// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.listen(process.env.PORT, () => {
    console.log(`Server is runnig at ${process.env.PORT}`)
})