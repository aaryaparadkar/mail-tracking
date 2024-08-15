import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(Bun.env.MONGO_URI!)
        console.log("MongoDB Connected")
    } catch (error) {
        console.log("Databse connection failed: ", error)
        process.exit(1)
    }
}