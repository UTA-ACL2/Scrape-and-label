import mongoose, {Mongoose} from 'mongoose';

let dbInstance : Mongoose | null = null;

export async function getDatabase() : Promise < Mongoose > {
    if(!dbInstance) {
        try {
            dbInstance = await mongoose.connect(process.env.MONGODB_URI as string);
        } catch (e) {
            console.error("Could not connect to the database", e);
            throw e;
        }
    }
    return dbInstance;
}