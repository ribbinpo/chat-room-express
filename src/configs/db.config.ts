import { MongoClient } from "mongodb";
import "dotenv/config";

const URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017";
const DATABASE_NAME = process.env.DB_NAME ?? "chat-room";

async function connectToMongoDB(uri = URI, dbName = DATABASE_NAME) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    return { client, db };
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

async function closeMongoDBConnection(client: MongoClient) {
  try {
    await client.close();
  } catch (error) {
    console.error("Error closing MongoDB connection", error);
  }
}

export { connectToMongoDB, closeMongoDBConnection };
