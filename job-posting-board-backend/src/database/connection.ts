import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const URL: string = process.env.MONGO_URL!;

const connection = async () => {
  try {    
    if (URL !== undefined) {
      const result = await mongoose.connect(URL)
      console.log(`MongoDB Connected: ${result.connection.host}`);   
    }
  } catch (error) {
    throw new Error((error as any).message);
  }
};

export default connection;
