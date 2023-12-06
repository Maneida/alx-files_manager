import { MongoClient } from "mongodb";

class DBClient {
  constructor() {
    const {
      DB_HOST = "localhost",
      DB_PORT = 27017,
      DB_DATABASE = "files_manager",
    } = process.env;

    this.client = new MongoClient(`mongodb://${DB_HOST}:${DB_PORT}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error(`Error connecting to MongoDB: ${error}`);
    }
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    try {
      const usersCollection = this.client.db().collection("users");
      const count = await usersCollection.countDocuments();
      return count;
    } catch (error) {
      console.error(`Error counting users in MongoDB: ${error}`);
      return -1;
    }
  }

  async nbFiles() {
    try {
      const filesCollection = this.client.db().collection("files");
      const count = await filesCollection.countDocuments();
      return count;
    } catch (error) {
      console.error(`Error counting files in MongoDB: ${error}`);
      return -1;
    }
  }
}

const dbClient = new DBClient();

export default dbClient;
