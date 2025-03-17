import mongoose from "mongoose";

if (!process.env.MONGO_DB_URI) {
  console.log("please say something");
  throw new Error("please create your database uri ");
}

const connectDB = async function () {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI as string);
    console.log(`database connected successfully `);
  } catch (error) {
    console.log(
      "Error while trying to connect to the database",
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
};

export default connectDB;
