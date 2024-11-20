import { CartProduct, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { databaseService } from "../utils/database";

export class CartProductRepository {
    private readonly cartProductDelegate: Prisma.CartProductDelegate<DefaultArgs>;

    constructor() {
        this.cartProductDelegate = databaseService.cartProduct;
    }



    getCart(customerId: string): Promise<CartProduct[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const cart = await this.cartProductDelegate.findMany({ where: { customerId } });
                resolve(cart);
            } catch (e) {
                reject(e)
            }
        })
    }


    create(customerId: string, productId: string, data: Omit<Prisma.CartProductCreateInput, "customer" | "product">): Promise<CartProduct> {
        return new Promise(async (resolve, reject) => {
            try {
                const cartProduct = await this.cartProductDelegate.create({
                    data: {
                        ...data,
                        customer: { connect: { id: customerId } },
                        product: { connect: { id: productId } }
                    }
                });
                resolve(cartProduct);
            } catch (e) {
                reject(e)
            }
        })
    }

    update(customerId: string, productId: string, data: Prisma.CartProductUpdateInput): Promise<CartProduct> {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedCartProduct = await this.cartProductDelegate.update({ where: { productId_customerId: { customerId, productId } }, data });
                resolve(updatedCartProduct);
            } catch (e) {
                reject(e)
            }
        })
    }

    updateQuantity(customerId: string, productId: string, data: {quantity: number, totalPrice: number}): Promise<CartProduct> {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedCartProduct = await this.cartProductDelegate.update({ where: { productId_customerId: { customerId, productId } }, data });
                resolve(updatedCartProduct);
            } catch (e) {
                reject(e)
            }
        })
    }

    removefromCart(productId: string, customerId: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.cartProductDelegate.delete({ where: { productId_customerId: { productId, customerId } } });
                resolve(true);
            } catch (e) {
                reject(e);
            }
        })
    }

    removeAllFromCart(customerId: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.cartProductDelegate.deleteMany({ where: { customerId } });
                resolve(true);
            } catch (e) {
                reject(e);
            }
        })
    }

}