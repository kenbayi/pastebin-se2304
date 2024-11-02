import app from "./server";
import {MetadataDataSource} from "./config/data-source";
import * as redis from "redis";
import redisService from "./services/redisService";
import "./controller/cloud-management/cloudDelete";

const port = process.env.PORT || 3001;

const redisClient = redis.createClient({
    url: 'redis://127.0.0.1:6379'
})

async function startServer(){
    try{
        await MetadataDataSource.initialize();
        console.log("connected to metadatadb");

        await redisClient.connect();

        redisClient.on("error", (err) => {
            console.error("Redis error:", err);
        });

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }catch(error){
        console.log("Error during connections: ", error);
    };
};

startServer();

export { redisClient };  

