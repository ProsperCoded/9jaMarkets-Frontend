import { NextFunction, Request, RequestHandler, Response } from "express";
import { CartService } from "./cart.service";
import { ResponseDto } from "../../dtos/response.dto";
import { ResponseStatus } from "../../dtos/interfaces/response.interface";
import { SuccessMessages } from "../../constants/success-messages.enum";
import { HttpStatus } from "../../constants/http-status.enum";
import { DataFormatterHelper } from "../../helpers/format.helper";
import { CartProduct } from "@prisma/client";


export class CartController {
    constructor(private readonly cartService: CartService) { }

    private formatCartData(cart: CartProduct[]): void {
        cart.forEach(item => DataFormatterHelper.formatDatabaseObject<CartProduct>(item, ["orderId"]));
    }

    /**
 * Get Cart by Customer Id
 * @param request {Request}
 * @param response (Response}
 * @param next {NextFunction}
 */
    getCart: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.cartService.getCart(request.params.customerId);
            this.formatCartData(result);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.GET_CART_SUCCESS, result);
            return response.status(HttpStatus.OK).send(resObj);
        } catch (e) {
            next(e);
        }
    }


    /**
 * Update Cart
 * @param request {Request}
 * @param response (Response}
 * @param next {NextFunction}
 */
    updateCart: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.cartService.updateCart(request.body.customer.id, request.params.productId, request.body);
            this.formatCartData(result);
            DataFormatterHelper.formatDatabaseObject(result);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.UPDATE_CART_SUCCESS, result);
            return response.status(HttpStatus.OK).send(resObj);
        } catch (e) {
            next(e);
        }
    }
    


    /**
 * Remove product from Cart
 * @param request {Request}
 * @param response (Response}
 * @param next {NextFunction}
 */
    removeFromCart: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
        try {
            await this.cartService.removeFromCart(request.body.customer.id, request.params.productId);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.REMOVE_FROM_CART_SUCCESS);
            return response.status(HttpStatus.NO_CONTENT).send(resObj);
        } catch (e) {
            next(e);
        }
    }


    /**
 * Remove all products from Cart
 * @param request {Request}
 * @param response (Response}
 * @param next {NextFunction}
 */

    removeAllFromCart: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
        try {
            await this.cartService.removeAllFromCart(request.body.customer.id);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.CLEAR_CART_SUCCESS);
            return response.status(HttpStatus.NO_CONTENT).send(resObj);
        } catch (e) {
            next(e);
        }
    }

}