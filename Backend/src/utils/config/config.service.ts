import { ConfigInterface } from "./config.interface";
import { config } from "dotenv";

config();

class ConfigService implements ConfigInterface {
  private readonly config: any;
  private static instance: ConfigService;

  constructor() {
    this.config = process.env;
  }

  get<T = any>(propertyPath: string, defaultValue?: T): T | undefined {
    const value = this.config[propertyPath];
    return value ? (value as unknown as T) : defaultValue;
  }

  static getInstance(): ConfigService {
    if (!this.instance) {
      this.instance = new ConfigService();
    }
    return this.instance;
  }
}

export const configService = ConfigService.getInstance(); // To return an instance of the ConfigService class