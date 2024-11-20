import { NextFunction, Request, RequestHandler, Response } from "express";
import { JWTService } from "../../jwt/jwt.service";
import { WinstonLogger } from "../../logger/winston.logger";
import { Customer } from "@prisma/client";
import { ErrorMessages } from "../../../constants/error-messages.enum";
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';
import { cryptoService } from "../../crytpo/crypto.service";
import { CustomerRepository } from "../../../repositories/customer.repository";
import { NotFoundException } from "../../exceptions/not-found.exception";


export class CustomerAuthGaurd {
    private strict?: boolean;
    private id?: boolean;
    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly logger: WinstonLogger,
        private readonly jwtService: JWTService
    ) { }

    authorise = (options?: { strict?: boolean, id?: boolean }):
        RequestHandler => async (request: Request, resposne: Response, next: NextFunction) => {
            this.strict = options?.strict || false;
            this.id = options?.id || false;
            try {
                const customer = await this.validateRequest(request as unknown as { headers: { authorization: any }, params: { customerId: string } });
                request.body.customer = customer;
                next();
            } catch (error) {
                next(error);
            }
        }

    private getPayload(token: string): { [key: string]: any } {
        const decoded = decodeURIComponent(token);
        const decrypted = cryptoService.decrypt(decoded);
        const payload = this.jwtService.verifyToken(decrypted);
        return payload;
    }


    private async validateRequest(request: { headers: { authorization: any }, params: {customerId: string} }): Promise<Customer> {
        if (!request.headers.authorization) {
            this.logger.error(ErrorMessages.NO_AUTH_ERROR);
            throw new UnauthorizedException(ErrorMessages.NO_AUTH_ERROR);
        }
        const auth = request.headers.authorization;
        if (auth.split(' ')[0] !== 'Bearer') {
            this.logger.error(ErrorMessages.INVALID_AUTH_TOKEN_SUPPLIED);
            throw new UnauthorizedException(ErrorMessages.INVALID_AUTH_TOKEN_SUPPLIED);
        }
        const token = auth.split(' ')[1];
        try {
            const { id } = this.getPayload(token);
            const customer = await this.customerRepository.getCustomerById(id);

            if (!customer) {
                this.logger.error(ErrorMessages.CUSTOMER_NOT_FOUND);
                throw new NotFoundException(ErrorMessages.CUSTOMER_NOT_FOUND);
            }

            // Check for Email Verification on Strict Level
            if (this.strict && !customer.emailVerifiedAt) {
                this.logger.error(ErrorMessages.CUSTOMER_EMAIL_NOT_VERIFIED);
                throw new UnauthorizedException(ErrorMessages.CUSTOMER_EMAIL_NOT_VERIFIED);
            }

            // Check for ID Compatibility on ID Level
            if (this.id && customer.id !== request.params.customerId) {
                this.logger.error(ErrorMessages.USER_UNAUTHORIZED);
                throw new UnauthorizedException(ErrorMessages.USER_UNAUTHORIZED);
            }

            return customer;
        } catch (error) {
            this.logger.error(`${ErrorMessages.USER_UNAUTHORIZED}: ${error}`);
            throw new UnauthorizedException(ErrorMessages.USER_UNAUTHORIZED);
        }
    }
}