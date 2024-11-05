import EmailFacade from "./emailService/emailFacade";
import redisService from "./redisService";

redisService.on("passwordUpdated", async ({ email }) => {
    try {
        await redisService.deleteResetToken(email);
        await EmailFacade.sendNotificationEmail(email);
    } catch (error) {
        console.error('Error in passwordUpdated listener:', error);
    }
});
 