import { sendEmail } from './emailService';
import EmailFactory from './emailFactory';

class EmailFacade {
    static async sendPasswordResetEmail(email: string, resetLink: string) {
        const emailContent = EmailFactory.createEmail('reset', resetLink);
        return await sendEmail(email, emailContent.subject, emailContent.html);
    }

    static async sendNotificationEmail(email: string, message?: string) {
        const emailContent = EmailFactory.createEmail('updPassword');
        return await sendEmail(email, emailContent.subject, emailContent.html);
    }
}

export default EmailFacade;
