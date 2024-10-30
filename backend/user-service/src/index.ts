import { MetadataDataSource } from "./config/data-source";
import app from "./server";
import * as redis from "redis";
import redisService from "./service/redisService"; 
import "./service/redisObserver"; 

const port = process.env.PORT || 3000;

const redisClient = redis.createClient({
    url: 'redis://127.0.0.1:6379' 
});

async function startServer() {
    try {
        await MetadataDataSource.initialize();
        console.log('Connected to meta_db');

        await redisClient.connect();

        redisClient.on("error", (err) => {
            console.error("Redis error:", err);
        });

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    } catch (error) {
        console.error("Error during connections: ", error);
    }
}

startServer();

export { redisClient };  
