import { Prisma, Rating } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { databaseService } from "../utils/database";


export class RatingRepository {
    private readonly ratingDelegate: Prisma.RatingDelegate<DefaultArgs>;
    constructor() {
        this.ratingDelegate = databaseService.rating;
    }

    getAverageRating(productId: string): Promise<number> {
        return new Promise(async (resolve, reject) => {
            try {
                const ratings = await this.ratingDelegate.findMany({ where: { productId } });
                const averageRating = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;
                resolve(averageRating);
            } catch (e) {
                reject(e);
            }
        });
    }

    getAllRatings(productId: string): Promise<Rating[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const ratings = await this.ratingDelegate.findMany({ where: { productId } });
                resolve(ratings);
            } catch (e) {
                reject(e);
            }
        });
    }

    create(customerId: string, productId: string, data: Omit<Prisma.RatingCreateInput, "customer" | "product">): Promise<Rating> {
        return new Promise(async (resolve, reject) => {
            try {
                const rating = await this.ratingDelegate.create({
                    data: {
                        ...data,
                        customer: { connect: { id: customerId } },
                        product: { connect: { id: productId } }
                    }
                });
                resolve(rating);
            } catch (e) {
                reject(e);
            }
        });
    }

    update(ratingId: string, data: Prisma.RatingUpdateInput): Promise<Rating> {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedRating = await this.ratingDelegate.update({ where: { id: ratingId }, data });
                resolve(updatedRating);
            } catch (e) {
                reject(e);
            }
        });
    }

    delete(ratingId: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.ratingDelegate.delete({ where: { id: ratingId } });
                resolve(true);
            } catch (e) {
                reject(e);
            }
        });
    }
}