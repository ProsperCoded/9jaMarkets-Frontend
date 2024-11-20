import { PhoneNumber, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { databaseService } from "../utils/database";


export class PhoneNumberRepository {
    private readonly phoneNumberDelegate: Prisma.PhoneNumberDelegate<DefaultArgs>;

    constructor() {
        this.phoneNumberDelegate = databaseService.phoneNumber;
    }

    findCustomerPhoneNumbers(customerId: string): Promise<PhoneNumber[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const numbers = await this.phoneNumberDelegate.findMany({ where: { customerId } });
                resolve(numbers)
            } catch (e) {
                reject(e)
            }
        })
    }

    findMerchantPhoneNumbers(merchantId: string): Promise<PhoneNumber[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const numbers = await this.phoneNumberDelegate.findMany({ where: { merchantId } });
                resolve(numbers)
            } catch (e) {
                reject(e)
            }
        })
    }

    createCustomerPhoneNumbers(customerId: string, phoneNumbers: Prisma.PhoneNumberCreateInput[]): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = phoneNumbers.map(phoneNumber => ({ ...phoneNumber, customerId }));
                await this.phoneNumberDelegate.createMany({ data });
                resolve(true);
            } catch (e) {
                reject(e);
            }
        });
    }

    createMerchantPhoneNumbers(merchantId: string, phoneNumbers: Prisma.PhoneNumberCreateInput[]): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = phoneNumbers.map(phoneNumber => ({ ...phoneNumber, merchantId }));
                await this.phoneNumberDelegate.createMany({ data });
                resolve(true);
            } catch (e) {
                reject(e);
            }
        });
    }
    deleteCustomerNumbers(customerId: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.phoneNumberDelegate.deleteMany({ where: { customerId } });
                resolve(true);
            } catch (e) {
                reject(e)
            }
        })
    }

    deleteMerchantNumbers(merchantId: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.phoneNumberDelegate.deleteMany({ where: { merchantId } });
                resolve(true);
            } catch (e) {
                reject(e)
            }
        })
    }
}