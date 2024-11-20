import { LoggerPath, LoggerPathIndex } from "../../constants/logger-paths.enum";
import { ILogger } from "./logger.interface";
import { LoggerOptions, Logger, transports, format, createLogger } from "winston";
const { combine, timestamp, label, prettyPrint } = format;

export class WinstonLogger implements ILogger {
    private readonly logConfig: LoggerOptions;
    public logger: Logger;

    constructor(scope: string) {
        const filePath = (LoggerPath as LoggerPathIndex)[scope] ||"logs/app.log";
        this.logConfig = {
            transports: [
                new transports.Console(),
                new transports.File({ filename: filePath }),
            ],
            format: combine(label({ label: scope }), timestamp(), prettyPrint())
        };
        this.logger = createLogger(this.logConfig);
    }

    debug(message: string, ...args: any[]): void {
        this.logger.debug(message, args);
    }
    error(message: string, ...args: any[]): void {
        this.logger.error(message, args);
    }
    info(message: string, ...args: any[]): void {
        this.logger.info(message, args);
    }
    warn(message: string, ...args: any[]): void {
        this.logger.warn(message, args);
    }
}