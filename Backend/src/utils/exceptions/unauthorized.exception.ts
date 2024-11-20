import { HttpStatus } from "../../constants/http-status.enum";
import { BaseException } from "./base.exception";

export class UnauthorizedException extends BaseException {
    constructor(message: string) {
        super(message);
        this.status = HttpStatus.UNAUTHORIZED;
        this.reason = 'Unauthorized';
    }
}