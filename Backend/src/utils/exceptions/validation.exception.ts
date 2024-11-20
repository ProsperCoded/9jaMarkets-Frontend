import { HttpStatus } from "../../constants/http-status.enum";
import { BaseException } from "./base.exception";

export class ValidationException extends BaseException {
    readonly errors: any;
    readonly errorString?: string;
    constructor(reason: string, errorString?: string,  errors?: any) {
        super("Validation Error");
        this.status = HttpStatus.FORBIDDEN;
        this.reason = reason;
        this.errorString = errorString;
        this.errors = errors;
    }
}