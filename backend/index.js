import express from 'express' 
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRouter from './routes/tours.js'

dotenv.config()

// Set Mongoose config

mongoose.set('strictQuery', false)
const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        useNewUrlParser: true;
        useUnifiedTopolopy: true;
        console.log('MongoDB database connected')
    } catch (err) {
        console.log(err);
        console.log("MongoDB connection failed")
    }
}

const app = express()
const port = process.env.PORT || 8000

// Middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/tours', tourRouter)

// Test route
app.get("/", (req, res) => {
    res.send("API is working");
});

// Start server and connect to DB
app.listen(port, () => {
    connect();
    console.log('Server listening on port', port)
});
