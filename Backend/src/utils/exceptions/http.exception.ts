import { BaseException } from "./base.exception";

export default class HttpException extends BaseException{

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}