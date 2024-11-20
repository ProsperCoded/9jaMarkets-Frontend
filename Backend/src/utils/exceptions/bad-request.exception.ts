import { HttpStatus } from '../../constants/http-status.enum';
import { BaseException } from './base.exception';

export class BadRequestException extends BaseException{
    constructor(message: string) {
        super(message);
        this.status = HttpStatus.BAD_REQUEST;
        this.reason = 'Bad Request';
    }
}