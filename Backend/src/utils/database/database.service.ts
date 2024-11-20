import { PrismaClient } from "@prisma/client";
import { ILogger } from "../logger/logger.interface";
import { WinstonLogger } from "../logger/winston.logger";

export class DatabaseService extends PrismaClient{
    private logger : ILogger;
    constructor(){
        super();
        this.logger = new WinstonLogger("DatabaseService");
    }
    connect(): void{
        this.$connect()
        .then(() => {
            this.logger.info("Database Connected Successfully");
        })
        .catch((error) => {
            this.logger.error("Database Connection Error: ", error);
            process.exit(0);
        });
    }
}