import mongoose from "mongoose";
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

let cached = (global as any).mongoose || {
    conn: null,
    promise: null
};
const opts = {
    bufferCommands: true,
    dbName: "Anivoice",
    serverSelectionTimeoutMS: 5000, // Timeout after 5s of inactivity
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
};

export const getDatabase = async() => {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongoose) => {
                console.log("db started")
            });
    }
    cached.conn = await cached.promise;

    // Add event listeners
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected!');
    });

    mongoose.connection.on('error', (err:any) => {
        console.error(`MongoDB connection error: ${err}`);
        // Attempt to reconnect
        mongoose.connect(MONGODB_URI, opts);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected!');
        // Attempt to reconnect
        mongoose.connect(MONGODB_URI, opts);
    });

    return cached.conn;
};