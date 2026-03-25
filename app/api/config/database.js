import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Define MONGODB URL environment variable');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        console.log("Using existing MongoDB connection")
        return cached.conn;
    }

    if (!cached.promise) {
    const opts = {
      bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('Database Connected');
        return mongoose;
    });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}

export default connectDB;

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI);
//         console.log(`Database Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`Database Connection Error: ${error.message}`);
//         process.exit(1);
//     }
// }

// module.exports = connectDB;

// HOW the CAched feature works 
// let cached = global.mongoose;           // 1. Check if we already have a saved connection

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };   // 2. If not, create a place to save it
// }

// async function connectDB() {
//   if (cached.conn) {                    // 3. If we already have a working connection → just use it!
//     console.log('✅ Using existing MongoDB connection');
//     return cached.conn;
//   }

//   if (cached.promise) {                 // 4. If connection is still being made → wait for it
//     return await cached.promise;
//   }

//   // 5. Only if no connection exists → make a new one and save it
//   cached.promise = mongoose.connect(...).then(...);
//   cached.conn = await cached.promise;
//   return cached.conn;
// }