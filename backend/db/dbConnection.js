import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database connected successfully`);
  } catch (error) {
    console.log(`Error in dbConnect :- ${error}`);
  }
};
