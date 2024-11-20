import { Customer, Prisma } from "@prisma/client";
import { ICustomerRepository } from "./interfaces/customer.repository.interface";
import { databaseService } from "../utils/database";
import { DefaultArgs } from "@prisma/client/runtime/library";

export class CustomerRepository implements ICustomerRepository {
    private readonly customerDelegate: Prisma.CustomerDelegate<DefaultArgs>;

    constructor() {
        this.customerDelegate = databaseService.customer;
    }

    findAll(): Promise<Customer[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const customers = await this.customerDelegate.findMany();
                resolve(customers)
            } catch (e) {
                reject(e)
            }
        })
    }

    getCustomerById(id: string, options: { cart: boolean } = { cart: false }): Promise<Customer | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const customer = await this.customerDelegate.findUnique({
                    where: { id },
                    include: {
                        addresses: true,
                        phoneNumbers: true,
                        cart: options.cart
                    }
                });
                resolve(customer)
            } catch (e) {
                reject(e);
            }
        })
    }

    getCustomerByEmail(email: string, options: { cart: boolean } = { cart: false }): Promise<Customer | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const customer = await this.customerDelegate.findUnique({
                    where: { email },
                    include: {
                        addresses: true,
                        phoneNumbers: true,
                        cart: options.cart
                    }
                });
                resolve(customer)
            } catch (e) {
                reject(e);
            }
        })
    }

    getByGoogleId(googleId: string): Promise<Customer | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const customer = await this.customerDelegate.findUnique({
                    where: { googleId },
                    include: {
                        addresses: true,
                        phoneNumbers: true,
                    }
                });
                resolve(customer)
            } catch (e) {
                reject(e);
            }
        })
    }
    isEmailVerified(id: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const customer = await this.customerDelegate.findUnique({ where: { id } });
                resolve(!!customer?.emailVerifiedAt);
            } catch (e) {
                reject(e);
            }
        })
    }

    update(id: string, data: Prisma.CustomerUpdateInput): Promise<Customer> {
        return new Promise(async (resolve, reject) => {
            try {
                const customer = await this.customerDelegate.update({
                    where: { id }, data,
                    include: {
                        addresses: true,
                        phoneNumbers: true
                    }
                });
                resolve(customer)
            } catch (e) {
                reject(e);
            }
        })
    }

    create(data: Prisma.CustomerCreateInput, addresses: Prisma.AddressCreateManyCustomerInput[] = [], phoneNumbers: Prisma.PhoneNumberCreateManyCustomerInput[] = []): Promise<Customer> {
        return new Promise(async (resolve, reject) => {
            try {
                const customer = await this.customerDelegate.create({
                    data: {
                        ...data,
                        addresses: {
                            createMany: {
                                data: addresses
                            }
                        },
                        phoneNumbers: {
                            createMany: {
                                data: phoneNumbers
                            }
                        }
                    },
                    include: {
                        addresses: true,
                        phoneNumbers: true
                    }
                });
                resolve(customer)
            } catch (e) {
                reject(e);
            }
        })
    }

    delete(id: string): Promise<Customer> {
        return new Promise(async (resolve, reject) => {
            try {
                const customer = await this.customerDelegate.delete({ where: { id } });
                resolve(customer)
            } catch (e) {
                reject(e);
            }
        })
    }

}