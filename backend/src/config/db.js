import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: DB_HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error",error);
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB

