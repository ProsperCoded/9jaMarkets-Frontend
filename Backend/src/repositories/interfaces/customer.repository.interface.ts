import { Customer } from "@prisma/client";


export interface ICustomerRepository {
    getCustomerById(id: string): Promise<Customer | null>;
    getCustomerByEmail(email: string): Promise<Customer | null>;
    isEmailVerified(id: string): Promise<boolean>;
}