import { Prisma } from "@prisma/client";
import { IsDefined, IsString } from "class-validator";
import { IsNotEmpty } from "class-validator";

export class AddressCreateDto implements Prisma.AddressCreateManyCustomerInput{

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    declare name: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    declare address: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    declare city: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    declare state: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    declare country: string;

    @IsString()
    @IsNotEmpty()
    declare zipCode?: string;

    @IsString()
    @IsNotEmpty()
    declare postalCode?: string;
}