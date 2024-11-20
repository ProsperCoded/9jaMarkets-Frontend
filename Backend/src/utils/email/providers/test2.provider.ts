import { EmailPaths } from "../../../constants/email.enum";
import { WinstonLogger } from "../../logger/winston.logger";
import { IEmailService } from "../email.service.interface";

export default class TestEmailProvider implements IEmailService {
    private readonly logger: WinstonLogger;
    constructor() {
        this.logger = new WinstonLogger("EmailService");
    }


    sendMail({ to, subject, options }: { to: string; subject: string; options: { template: EmailPaths; data: { [key: string]: any; }; }; }): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // Send email logic
            this.logger.info(`2Email sent to ${to} with subject ${subject} and template ${options.template}`, options.data);
            resolve(true);
        });
    }
}