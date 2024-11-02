import { redisClient } from "../index";
import EventEmitter from "events";

// Event emitter class for Redis events
class RedisService extends EventEmitter {
    async setResetToken(email: string, token: string) {
        await redisClient.setEx(`password-reset:${email}`, 600, token);
        this.emit("tokenSet", { email, token });
    }

    async getResetToken(email: string): Promise<string | null> {
        return await redisClient.get(`password-reset:${email}`);
    }

    async deleteResetToken(email: string) {
        await redisClient.del(`password-reset:${email}`);
        this.emit("tokenDeleted", { email });
    }
}

const redisService = new RedisService();
export default redisService;
 