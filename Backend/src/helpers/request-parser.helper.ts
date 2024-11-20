import { Request } from "express";
import { AppEnum } from "../constants/app.enum";

export class RequestParserHelper {
    constructor(private readonly request: Request) { }

    /**
     * Get Url
     * @returns {Request}
     */

    getUrl(path?: string): string {
        let url = `${this.request.protocol}://${this.request.get('host') + AppEnum.PREFIX}`;
        if (path) {
            url += `${path}`;
        }
        return url;
    }
}