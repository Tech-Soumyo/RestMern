import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT!);
    console.log("MongoDB Connection Succeded");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
