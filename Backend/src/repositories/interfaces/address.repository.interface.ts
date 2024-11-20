import { Address, Prisma } from "@prisma/client";

export interface IAddressRepository {
    createCustomerAddress( customerId: string, address: Prisma.AddressCreateInput): Promise<Address>;
    createMerchantAddress(marketId: string, address: Prisma.AddressCreateInput): Promise<Address>;
    updateByCustomerId(name: string, customerId: string, data: Prisma.AddressUpdateInput): Promise<Address>;
    updateByMerchantId(name: string, marketId: string, data: Prisma.AddressUpdateInput): Promise<Address>;
    deleteCustomerAddress(name: string, customerId: string): Promise<Address>;
    deleteMerchantAddress(name: string, marketId: string): Promise<Address>;
    getCustomerAddress(customerId: string): Promise<Address[]>;
    getMerchantAddress(marketId: string): Promise<Address[]>;
}