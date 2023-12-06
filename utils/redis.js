// utils/redis.js
import redis from "redis";
import { promisify } from "util";

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on("error", (error) => {
      console.error(`Error connecting to Redis: ${error}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    try {
      const value = await getAsync(key);
      return JSON.parse(value);
    } catch (error) {
      console.error(`Error getting value from Redis: ${error}`);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      const setAsync = promisify(this.client.set).bind(this.client);
      await setAsync(key, JSON.stringify(value), "EX", duration);
    } catch (error) {
      console.error(`Error setting value in Redis: ${error}`);
    }
  }

  async del(key) {
    try {
      const delAsync = promisify(this.client.del).bind(this.client);
      await delAsync(key);
    } catch (error) {
      console.error(`Error deleting value from Redis: ${error}`);
    }
  }
}

const redisClient = new RedisClient();

export default redisClient;
