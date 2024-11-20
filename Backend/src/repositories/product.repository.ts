import { Prisma, Product } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { databaseService } from "../utils/database";


export class ProductRepository {
    private readonly productDelegate: Prisma.ProductDelegate<DefaultArgs>;

    constructor() {
        this.productDelegate = databaseService.product;
    }


    findAll(): Promise<Product[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const products = await this.productDelegate.findMany();
                resolve(products);
            } catch (error) {
                reject(error);
            }
        });
    }

    getById(id: string): Promise<Product | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const product = await this.productDelegate.findUnique({ where: { id } });
                resolve(product);
            } catch (error) {
                reject(error);
            }
        });
    }

    getMerchantProducts(merchantId: string): Promise<Product[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const products = await this.productDelegate.findMany({ where: { merchantId } });
                resolve(products);
            } catch (error) {
                reject(error);
            }
        });
    }

    getFeaturedProducts(merchantId: string): Promise<Product[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const products = await this.productDelegate.findMany({
                    where: {
                        merchantId,
                        NOT: { featuredDate: null }
                    },
                    orderBy: {
                        featuredDate: 'desc'
                    }
                });
                resolve(products);
            } catch (error) {
                reject(error);
            }
        });
    }

    update(id: string, product: Prisma.ProductUpdateInput): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedProduct = await this.productDelegate.update({
                    where: { id },
                    data: product
                });
                resolve(updatedProduct);
            } catch (error) {
                reject(error);
            }
        });
    }

    create(merchantId: string, product: Prisma.ProductCreateWithoutMerchantInput): Promise<Product> {
        console.log(merchantId, product);
        return new Promise(async (resolve, reject) => {
            try {
                const newProduct = await this.productDelegate.create({
                    data: {
                        ...product,
                        merchant: {
                            connect: {
                                id: merchantId
                            }
                        }
                    }
                });
                resolve(newProduct);
            } catch (error) {
                reject(error);
            }
        });
    }


    delete(id: string): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            try {
                const deletedProduct = await this.productDelegate.delete({ where: { id } });
                resolve(deletedProduct);
            } catch (error) {
                reject(error);
            }
        });
    }
}