import { Merchant } from "@prisma/client";


export interface IMerchantRepository {
    getMerchantById(id: string): Promise<Merchant | null>;
    getMerchantByEmail(email: string): Promise<Merchant | null>;
    getMerchantByBrandName(brandName: string): Promise<Merchant | null>;
    isEmailVerified(id: string): Promise<boolean>;
}