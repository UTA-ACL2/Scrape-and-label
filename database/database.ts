
import mongoose from "mongoose";
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

let cached = (global as any).mongoose || {
    conn: null,
    promise: null
};
export const getDatabase = async() => {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            dbName: "Anivoice",
            serverSelectionTimeoutMS: 5000, // Timeout after 5s of inactivity
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        };
        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongoose) => {
                console.log("db started")
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
};