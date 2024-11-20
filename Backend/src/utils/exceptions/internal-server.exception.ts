import { BaseException } from "./base.exception";

export class InternalServerException extends BaseException {
    constructor(message: string) {
        super(message);
        this.status = 500;
        this.reason = 'Internal Server Error';
    }
}