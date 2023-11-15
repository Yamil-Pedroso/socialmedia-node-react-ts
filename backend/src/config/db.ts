import mongoose, { ConnectOptions } from 'mongoose';
import color from 'colors';
import dotenv from 'dotenv';

dotenv.config({ path: './src/config/config.env' });

interface MyConnectOptions extends ConnectOptions {
 
}

color;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI as string;
    const conn = await mongoose.connect(mongoUri, {
    
    } as MyConnectOptions);

    console.log(`MongoDB Connected: ${conn.connection.host}`.yellow.bold);
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;