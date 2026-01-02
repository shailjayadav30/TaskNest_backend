import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDb = async () => {
  try {
    if (!process.env.MONGO_URL) throw new Error("MONGO_URL  not defined ");
    const connection = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );
    console.log(
      `Database connected successfully at host ${connection.connection.host}`
    );
  } catch (error) {
    console.log("Connection error", error.message);
    process.exit(1);
  }
};

export default connectDb;
