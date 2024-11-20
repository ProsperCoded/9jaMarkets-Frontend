import { IResponse, ResponseStatus } from "./interfaces/response.interface";


export class ResponseDto implements IResponse {
    constructor(
        public status: ResponseStatus,
        public message: string,
        public data?: any
    ) { }
}