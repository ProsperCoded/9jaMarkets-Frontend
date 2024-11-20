import { Request, RequestHandler, Response } from "express";
import { SuccessMessages } from "../constants/success-messages.enum";
import { ResponseStatus } from "../dtos/interfaces/response.interface";
import { ResponseDto } from "../dtos/response.dto";
import { HttpStatus } from "../constants/http-status.enum";
import { NotFoundException } from "../utils/exceptions/not-found.exception";

export class HomeController {
    index: RequestHandler = (request: Request, response: Response) => {
        const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.WELCOME_HOME);
        response.status(HttpStatus.OK).send(resObj);
    };

    notFound: RequestHandler = (request: Request, response: Response) => {
        const notFoundResponse = `Route, ${request.originalUrl} not found. Please check the route and try again.`;
        throw new NotFoundException(notFoundResponse);
    }
}