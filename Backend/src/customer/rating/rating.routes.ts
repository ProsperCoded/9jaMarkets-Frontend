import { Router } from "express";
import { WinstonLogger } from "../../utils/logger/winston.logger";
import { JWTService } from "../../utils/jwt/jwt.service";
import { CustomerRepository } from "../../repositories/customer.repository";
import { CustomerAuthGaurd } from "../../utils/middlewares/guards/customer.auth.guard";
import { Validator } from "../../utils/middlewares/validator.middleware";
import { RatingController } from "./rating.controller";
import { RatingService } from "./rating.service";
import { RatingRepository } from "../../repositories/rating.repository";
import { IdDto } from "../../dtos/id.dto";
import { RatingUpdateDto } from "../dtos/rating-update.dto";
import { RatingCreateDto } from "../dtos/rating-create.dto";

const router = Router();

const logger = new WinstonLogger("RatingService");
const jwtService = new JWTService();
const ratingRepository = new RatingRepository();
const customerRepository = new CustomerRepository();
const ratingService = new RatingService(ratingRepository, logger);
const ratingController = new RatingController(ratingService)
const validator = new Validator();
const customerAuthGaurd = new CustomerAuthGaurd(customerRepository, logger, jwtService)



// Get Ratings for a Product
router.get("/:productId", customerAuthGaurd.authorise(), validator.single(IdDto, "params"), ratingController.getRatings);

// Create Rating
router.post("/:productId", validator.multiple([
    { schema: IdDto, source: "params" },
    { schema: RatingCreateDto, source: "body" }
]), customerAuthGaurd.authorise(), ratingController.createRating);

// Update Rating
router.put("/:ratingId", validator.multiple([
    { schema: IdDto, source: "params" },
    { schema: RatingUpdateDto, source: "body" }
]), customerAuthGaurd.authorise(), ratingController.updateRating);

// Delete Rating
router.delete("/:ratingId", customerAuthGaurd.authorise(), validator.single(IdDto, "params"), ratingController.deleteRating);

export default router;