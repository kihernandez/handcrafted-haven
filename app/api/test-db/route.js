import connectDB from "../config/database";

export async function GET() {
    try {
        const mongoose = await connectDB();

        // Get database connection 
        const db = mongoose.connection.db
        const collectionName = "products";        // I will change this to the collections that will be created for this project

    const collection = db.collection(collectionName);
    
    // Get basic info and sample documents (limit to 5)
    const documentCount = await collection.countDocuments();
    const sampleDocs = await collection.find({}).limit(10).toArray();

    return Response.json({
      status: "✅ Connected Successfully",
      message: `Successfully reading from collection: "${collectionName}"`,
      collectionInfo: {
        collectionName: collectionName,
        documentCount: documentCount,
        sampleDocuments: sampleDocs,
        isEmpty: documentCount === 0
      },
      databaseName: db.databaseName,
      timestamp: new Date().toISOString()
    });
        
    } catch (error) {
        return Response.json({
            message: 'Database connection Failed!',
            error: error.message
        },
            { status: 500 });
    }
}