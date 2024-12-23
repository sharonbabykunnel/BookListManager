import mongoose from 'mongoose'

// Data Base connection with aotomatic retry
const connectWithRetry = async () => {
  try {
    const db_url = process.env.DB_URL;
        await mongoose.connect(db_url,
          {
            serverSelectionTimeoutMS: 3000,
            socketTimeoutMS: 45000,
          }
        );
    } catch (error) {
        console.error("Error Connectin to MongoDB", error)
        setTimeout(connectWithRetry,5000)
    }
}


export default connectWithRetry