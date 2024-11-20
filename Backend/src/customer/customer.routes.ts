import { Router } from "express";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { CustomerRepository } from "../repositories/customer.repository";
import { AddressRepository } from "../repositories/address.repository";
import { PhoneNumberRepository } from "../repositories/phone-number.repository";
import { WinstonLogger } from "../utils/logger/winston.logger";
import { Validator } from "../utils/middlewares/validator.middleware";
import { IdDto } from "../dtos/id.dto";
import { CustomerAuthGaurd } from "../utils/middlewares/guards/customer.auth.guard";
import { JWTService } from "../utils/jwt/jwt.service";
import { CustomerUpdateDto } from "./dtos/customer-update.dto";

import CartRouter from "./cart/cart.routes";
import RatingRouter from "./rating/rating.routes";




// Customer Service Dependents
const customerRepository = new CustomerRepository();
const addressRepository = new AddressRepository();
const phoneNumberRepository = new PhoneNumberRepository();
const logger = new WinstonLogger("CustomerService");
const jwtService = new JWTService();

const customerService = new CustomerService(customerRepository, addressRepository, phoneNumberRepository, logger);
const customerController = new CustomerController(customerService);

const customerAuthGaurd = new CustomerAuthGaurd(customerRepository, logger, jwtService);
const validator = new Validator();

const router = Router()

// Add the CartRouter to the customer router
router.use("/cart", CartRouter);

// Add the RatingRouter to the customer router
router.use("/rating", RatingRouter);

// Customer Routes
router.get("/profile/:customerId", customerAuthGaurd.authorise({ id: true }), customerController.getCustomerById);

router.put("/profile/:customerId", validator.multiple([
    { schema: IdDto, source: "params" },
    { schema: CustomerUpdateDto, source: "body" }
]), customerAuthGaurd.authorise({ id: true }), customerController.updateCustomer);

router.delete("/profile/:customerId", validator.single(IdDto, "params"), customerAuthGaurd.authorise({ id: true }), customerController.deleteCustomer);

export default router;