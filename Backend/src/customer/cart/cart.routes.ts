import { Router } from "express";
import { CartService } from "./cart.service";
import { ProductRepository } from "../../repositories/product.repository";
import { CartProductRepository } from "../../repositories/cart-product.repository";
import { WinstonLogger } from "../../utils/logger/winston.logger";
import { CartController } from "./cart.controller";
import { Validator } from "../../utils/middlewares/validator.middleware";
import { CustomerAuthGaurd } from "../../utils/middlewares/guards/customer.auth.guard";
import { JWTService } from "../../utils/jwt/jwt.service";
import { CustomerRepository } from "../../repositories/customer.repository";
import { IdDto } from "../../dtos/id.dto";
import { AddToCartDto } from "../dtos/add-to-cart.dto";

const router = Router();
const logger = new WinstonLogger("CartService");
const jwtService = new JWTService();
const cartProductRepository = new CartProductRepository();
const productRepository = new ProductRepository();
const customerRepository = new CustomerRepository();
const cartService = new CartService(cartProductRepository, productRepository, logger);
const cartController = new CartController(cartService)
const validator = new Validator();
const customerAuthGaurd = new CustomerAuthGaurd(customerRepository, logger, jwtService)


// Get Cart by Customer Id
router.get("/:customerId", customerAuthGaurd.authorise({id: true}), validator.single(IdDto, "params"), cartController.getCart);

// Update Cart
router.put("/:productId", validator.multiple([
    { schema: IdDto, source: "params" },
    { schema: AddToCartDto, source: "body" }
]), customerAuthGaurd.authorise(), cartController.updateCart);

// Clear Cart
router.delete("/clear", customerAuthGaurd.authorise(), cartController.removeAllFromCart);

// Remove product from Cart
router.delete("/:productId",  validator.single(IdDto, "params"), customerAuthGaurd.authorise(), cartController.removeFromCart);


export default router;