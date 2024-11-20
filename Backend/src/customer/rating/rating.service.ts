import { ErrorMessages } from "../../constants/error-messages.enum";
import { RatingRepository } from "../../repositories/rating.repository";
import { InternalServerException } from "../../utils/exceptions/internal-server.exception";
import { WinstonLogger } from "../../utils/logger/winston.logger";
import { RatingCreateDto } from "../dtos/rating-create.dto";
import { RatingUpdateDto } from "../dtos/rating-update.dto";


export class RatingService {
    constructor(
        private readonly ratingRepository: RatingRepository,
        private readonly logger: WinstonLogger
    ) { }

    async getAllRatings(productId: string) {
        try {
            const ratings = await this.ratingRepository.getAllRatings(productId);
            return ratings;
        } catch (e) {
            this.logger.error(`${ErrorMessages.RATING_GET_ALL_FAILED}: ${e}`);
            throw new InternalServerException(ErrorMessages.RATING_GET_ALL_FAILED);
        }
    }

    async createRating(customerId: string, productId: string, data: RatingCreateDto) {
        try {
            await this.ratingRepository.create(customerId, productId, data);
            const ratings = await this.getAllRatings(productId);
            return ratings;
        } catch (e) {
            this.logger.error(`${ErrorMessages.RATING_CREATE_FAILED}: ${e}`);
            throw new InternalServerException(ErrorMessages.RATING_CREATE_FAILED);
        }
    }

    async updateRating(ratingId: string, data: RatingUpdateDto) {
        try {
            await this.ratingRepository.update(ratingId, data);
            return true;
        } catch (e) {
            this.logger.error(`${ErrorMessages.RATING_UPDATE_FAILED}: ${e}`);
            throw new InternalServerException(ErrorMessages.RATING_UPDATE_FAILED);
        }
    }

    async deleteRating(ratingId: string) {
        try {
            await this.ratingRepository.delete(ratingId);
            return true;
        } catch (e) {
            this.logger.error(`${ErrorMessages.RATING_DELETE_FAILED}: ${e}`);
            throw new InternalServerException(ErrorMessages.RATING_DELETE_FAILED);
        }
    }
}