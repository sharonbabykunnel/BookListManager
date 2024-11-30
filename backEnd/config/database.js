import config from './../../config.js'
import mongoose from 'mongoose'

const connectWithRetry = async () => {
  try {
    const db_url = process.env.DB_RUL;
        await mongoose.connect(db_url,
          {
            serverSelectionTimeoutMS: 3000,
            socketTimeoutMS: 45000,
          }
        );
    console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error Connectin to MongoDB", error)
        setTimeout(connectWithRetry,5000)
    }
}

connectWithRetry();

export default mongoose