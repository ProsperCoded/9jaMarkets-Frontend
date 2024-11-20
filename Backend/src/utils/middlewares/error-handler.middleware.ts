import { NextFunction, Request, Response } from "express";
import { ResponseStatus } from "../../dtos/interfaces/response.interface";
import { ResponseDto } from "../../dtos/response.dto";
import { HttpStatus } from "../../constants/http-status.enum";
import { BaseException } from "../exceptions/base.exception";


function errorHandler(error: BaseException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = error.message || "Something went wrong";

  const resObj = new ResponseDto(ResponseStatus.ERROR, message, error);
  response.status(status).send(resObj);
  return next();
}

export default errorHandler;