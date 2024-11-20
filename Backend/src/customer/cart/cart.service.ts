import { ErrorMessages } from "../../constants/error-messages.enum";
import { CartProductRepository } from "../../repositories/cart-product.repository";
import { ProductRepository } from "../../repositories/product.repository";
import { BadRequestException } from "../../utils/exceptions/bad-request.exception";
import { BaseException } from "../../utils/exceptions/base.exception";
import { InternalServerException } from "../../utils/exceptions/internal-server.exception";
import { NotFoundException } from "../../utils/exceptions/not-found.exception";
import { WinstonLogger } from "../../utils/logger/winston.logger";
import { AddToCartDto } from "../dtos/add-to-cart.dto";


export class CartService {
    constructor(
        private readonly cartProductRepository: CartProductRepository,
        private readonly productRepository: ProductRepository,
        private readonly logger: WinstonLogger
    ) { }

    async getCart(customerId: string) {
        try {
            const cart = await this.cartProductRepository.getCart(customerId);
            return cart;
        } catch (e) {
            this.logger.error(`${ErrorMessages.CART_GET_FAILED}: ${e}`);
            throw new InternalServerException(ErrorMessages.CART_GET_FAILED);
        }
    }

    async updateCart(customerId: string, productId: string, { quantity }: AddToCartDto) {
        try {
            // Remove Product from Cart if Quantity is 0
            if (quantity === 0) {
                await this.removeFromCart(customerId, productId);
                return this.getCart(customerId);
            };

            // Get Customer's Cart
            const cart = await this.getCart(customerId);

            // Get Product
            const product = await this.productRepository.getById(productId);
            if (!product) {
                this.logger.error(ErrorMessages.PRODUCT_NOT_FOUND);
                throw new NotFoundException(ErrorMessages.PRODUCT_NOT_FOUND);
            }

            if (product.stock < quantity) {
                this.logger.error(ErrorMessages.QUANTITY_NOT_AVAILABLE);
                throw new BadRequestException(ErrorMessages.QUANTITY_NOT_AVAILABLE);
            }

            const totalPrice = quantity * product.price;
            const cartProductData = { quantity, totalPrice };

            // Check if Product is already in Cart
            const existingProduct = cart.find((cartProduct) => cartProduct.productId === productId);

            // If Product is already in Cart, Update Quantity
            if (existingProduct) await this.cartProductRepository.update(customerId, productId, cartProductData);
            else await this.cartProductRepository.create(customerId, productId, cartProductData);

            return this.getCart(customerId);
        } catch (e) {
            if (e instanceof BaseException) {
                throw e;
            } else {
                this.logger.error(`${ErrorMessages.CART_ADD_FAILED}: ${e}`);
                throw new InternalServerException(ErrorMessages.CART_ADD_FAILED);
            }
        }
    }

    
    async removeFromCart(customerId: string, productId: string) {
        try {
            await this.cartProductRepository.removefromCart(productId, customerId);
            return true;
        } catch (e) {
            this.logger.error(`${ErrorMessages.CART_REMOVE_FAILED}: ${e}`);
            throw new InternalServerException(ErrorMessages.CART_REMOVE_FAILED);
        }
    }

    async removeAllFromCart(customerId: string) {
        try {
            await this.cartProductRepository.removeAllFromCart(customerId);
            return true;
        } catch (e) {
            this.logger.error(`${ErrorMessages.CART_REMOVE_FAILED}: ${e}`);
            throw new InternalServerException(ErrorMessages.CART_REMOVE_FAILED);
        }
    }
}