import { EventEmitter } from "stream";
import { redisClient } from "../index";

class RedisService extends EventEmitter {
    // Method to set a deleted paste with an expiration time
    async setDeletedPaste(pasteId: number, pasteData: string, expirationTime: number) {
        await redisClient.setEx(`deleted-paste:${pasteId}`, expirationTime, pasteData);
        this.emit("pasteDeleted", pasteData);
    }

    // Method to get the deleted paste data
    async getDeletedPaste(pasteId: number): Promise<string | null> {
        return await redisClient.get(`deleted-paste:${pasteId}`);
    }

    // Method to delete the deleted paste from Redis
    async deleteDeletedPaste(pasteId: number) {
        await redisClient.del(`deleted-paste:${pasteId}`);
    }

    // Method to get the TTL (time-to-live) of a deleted paste
    async getTTL(pasteId: number): Promise<number> {
        return await redisClient.ttl(`deleted-paste:${pasteId}`);
    }
}

const redisService = new RedisService();
export default redisService;
