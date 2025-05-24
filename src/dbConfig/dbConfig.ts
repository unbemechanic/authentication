//connecting project to database mongoDB

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // Make sure this is called early

const MONGO_URI = process.env.MONGO_URI;


export async function connect() {
    try { 
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables.");
        }
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB connected successfully!')
        });
        connection.on('error', (err) => {
            console.log('MongoDB connected failed!' + err)
        });
    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error)
    }
}