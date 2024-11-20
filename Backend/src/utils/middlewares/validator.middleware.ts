import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ValidationException } from "../exceptions/validation.exception";

enum ValidationErrorMessages {
    body = "There was an error with the request body",
    query = "There was an error with the query parameters",
    params = "There was an error with the request parameters"
}

interface IValidation {
    schema: any;
    source?: keyof typeof ValidationErrorMessages;
}

export class Validator {
    constructor() { }

    private getErrors(errors: ValidationError[]): string[] {
        return errors.flatMap(error => {
            if (error.constraints) {
                return Object.values(error.constraints);
            }
            // Handle nested errors
            if (error.children && error.children.length > 0) {
                return this.getErrors(error.children);
            }
            return [];
        });
    }

    single(schema: any, source: IValidation["source"] = 'body') {
        return (request: Request, response: Response, next: NextFunction) => {
            validate(plainToInstance(schema, request[source]), { skipMissingProperties: true, whitelist: true, forbidNonWhitelisted: true }).then(errors => {
                if (errors.length > 0) {
                    const errorArray = this.getErrors(errors);
                    const errorString = errorArray.join(', ');
                    next(new ValidationException(ValidationErrorMessages[source], errorString, errorArray));
                } else {
                    next();
                }
            });
        };
    }

    multiple(args: IValidation[]) {
        return (request: Request, response: Response, next: NextFunction) => {
            args.forEach(({ schema, source = 'body' }) => {
                validate(plainToInstance(schema, request[source]), { skipMissingProperties: true, whitelist: true, forbidNonWhitelisted: true }).then(errors => {
                    
                    if (errors.length > 0) {
                        const errorArray = this.getErrors(errors);
                        const errorString = errorArray.join(', ');
                        next(new ValidationException(ValidationErrorMessages[source], errorString, errorArray));
                    }
                });
            });
            next();
        };
    }
}