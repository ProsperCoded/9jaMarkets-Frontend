import { HttpStatus } from "../../constants/http-status.enum";
import { BaseException } from "./base.exception";

export class NotFoundException extends BaseException {
    constructor(message: string) {
        super(message);
        this.status = HttpStatus.NOT_FOUND;
        this.reason = 'Not Found';
    }
}