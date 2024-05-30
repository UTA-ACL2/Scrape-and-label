import mongoose from "mongoose";
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

let cached = (global as any).mongoose || {
    conn: null,
    promise: null
};

const connection:{isConnected?:number} = {};
export const getDatabase = async() => {
    if(connection.isConnected){
        return;
    }
    const db = await mongoose.connect(MONGODB_URI!);
    connection.isConnected = db.connections[0].readyState;
    console.log("db started")
}


// export const getDatabase = async() => {
//     if (cached.conn) {
//         return cached.conn;
//     }
//     if (!cached.promise) {
//         const opts = {
//             bufferCommands: false,
//             dbName: "Anivoice"
//         };
//         cached.promise = mongoose
//             .connect(MONGODB_URI, opts)
//             .then((mongoose) => {
//                 console.log("db started")
//             });
//     }
//     cached.conn = await cached.promise;
//     return cached.conn;
// };