import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const mongoUrl = process.env.MONGO_URL as string;
mongoose.connect(mongoUrl)
    .then(() => {
        console.log("Connection has been established successfully");
    })
    .catch((error) => {
        console.log('Error established successfully', error);
    })
