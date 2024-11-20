import { EmailPaths } from "../../constants/email.enum";

export interface IEmailService {
    sendMail(
        { to, subject, options }: {
            to: string;
            subject: string;
            options: {
                template: EmailPaths;
                data: { [key: string]: any; };
            };
        }
    )
        : Promise<boolean>;
}