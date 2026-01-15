import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        console.log("Will retry connection on next request...");
        // Don't exit - let the server start anyway
        // MongoDB will auto-reconnect when available
    }
};

export default connectDB;