import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DB_PATH)
        console.log("Connected to DB");
    } catch (err) {
        console.log("Mongo DB connection error", err);
    }
}

export default connectToDB