import { Address, Prisma } from "@prisma/client";
import { IAddressRepository } from "./interfaces/address.repository.interface";
import { databaseService } from "../utils/database";
import { DefaultArgs } from "@prisma/client/runtime/library";

export class AddressRepository implements IAddressRepository {
    private readonly addressDelegate: Prisma.AddressDelegate<DefaultArgs>;

    constructor() {
        this.addressDelegate = databaseService.address;
    }

    createCustomerAddress(customerId: string, address: Prisma.AddressCreateInput): Promise<Address> {
        return new Promise(async (resolve, reject) => {
            try {
                const createdAddress = await this.addressDelegate.create({
                    data: {
                        ...address,
                        customer: {
                            connect: {
                                id: customerId
                            }
                        }
                    }
                });
                resolve(createdAddress);
            } catch (e) {
                reject(e);
            }
        });
    }

    createMerchantAddress(merchantId: string, address: Prisma.AddressCreateInput): Promise<Address> {
        return new Promise(async (resolve, reject) => {
            try {
                const createdAddress = await this.addressDelegate.create({
                    data: {
                        ...address,
                        merchant: {
                            connect: {
                                id: merchantId
                            }
                        }
                    }
                });
                resolve(createdAddress);
            } catch (e) {
                reject(e);
            }
        });
    }


    getUniqueByCustomerId(name: string, customerId: string): Promise<Address | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const address = await this.addressDelegate.findUnique({ where: { name_customerId: { name, customerId } } });
                resolve(address)
            } catch (e) {
                reject(e);
            }
        });
    }

    getUniqueByMerchantId(name: string, merchantId: string): Promise<Address | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const address = await this.addressDelegate.findUnique({ where: { name_merchantId: { name, merchantId } } });
                resolve(address)
            } catch (e) {
                reject(e)
            }
        })
    }

    updateByCustomerId(name: string, customerId: string, data: Prisma.AddressUpdateInput): Promise<Address> {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedAddress = await this.addressDelegate.update({ where: { name_customerId: { name, customerId } }, data });
                resolve(updatedAddress);
            } catch (e) {
                reject(e);
            }
        });
    }

    updateByMerchantId(name: string, merchantId: string, data: Prisma.AddressUpdateInput): Promise<Address> {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedAddress = await this.addressDelegate.update({ where: { name_merchantId: { name, merchantId } }, data });
                resolve(updatedAddress);
            } catch (e) {
                reject(e)
            }
        })
    }

    deleteCustomerAddress(name: string, customerId: string): Promise<Address> {
        return new Promise(async (resolve, reject) => {
            try {
                const deletedAddress = await this.addressDelegate.delete({ where: { name_customerId: { name, customerId } } });
                resolve(deletedAddress);
            } catch (e) {
                reject(e);
            }
        });
    }

    deleteMerchantAddress(name: string, merchantId: string): Promise<Address> {
        return new Promise(async (resolve, reject) => {
            try {
                const deletedAddress = await this.addressDelegate.delete({ where: { name_merchantId: { name, merchantId } } });
                resolve(deletedAddress);
            } catch (e) {
                reject(e);
            }
        });
    }

    getCustomerAddress(customerId: string): Promise<Address[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const addresses = await this.addressDelegate.findMany({ where: { customerId } });
                resolve(addresses);
            } catch (e) {
                reject(e);
            }
        });
    }

    getMerchantAddress(merchantId: string): Promise<Address[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const addresses = await this.addressDelegate.findMany({ where: { merchantId } });
                resolve(addresses);
            } catch (e) {
                reject(e);
            }
        });
    }
}