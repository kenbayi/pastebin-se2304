class EmailFactory {
    static createEmail(type: string, additionalData?: string) {
        switch (type) {
            case 'reset':
                return {
                    subject: "Password Reset Request",
                    html: `
                    <html>
                    <body>
                        <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px;">
                            <tr><td style="text-align: center;"><h1 style="font-size: 24px; color: #333333;">Password Reset Request</h1></td></tr>
                            <tr><td style="text-align: center;"><p style="font-size: 16px; color: #555555;">You're receiving this email because you requested a password reset.</p></td></tr>
                            <tr><td style="text-align: center;"><p style="font-size: 14px; color: #777777;">Click the button below to reset your password:</p><a href="${additionalData}" style="background-color: #ff6600; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; font-size: 16px;">Reset Password</a></td></tr>
                            <tr><td style="text-align: center; padding-top: 20px;"><p style="font-size: 12px; color: #aaaaaa;">If you didn't request this, please ignore this email.</p><p style="font-size: 12px; color: #aaaaaa;">&copy; 2024 Ilyas Kenbay. All rights reserved.</p></td></tr>
                        </table>
                    </body>
                    </html>
                    `
                };
            default:
                throw new Error("Email type not recognized");
        }
    }
}

export default EmailFactory;
