import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, { //fetches mongoose connection from .env
      useNewUrlParser: true, //new url parser
      useUnifiedTopology: true, // new connection management engine
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } 
  
  catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // Stop the process if DB connection fails
  }
};

export default connectDB;
