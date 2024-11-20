import { Prisma } from "@prisma/client";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsDefined, IsEmail, IsNotEmpty, IsString, IsStrongPassword, ValidateNested } from "class-validator";
import { AddressCreateDto } from "../../dtos/address-create.dto";
import { Type } from "class-transformer";

interface CustomerCreateInput extends Omit<Prisma.CustomerCreateInput, "phoneNumbers" | "addresses"> {
    phoneNumbers?: string[];
    addresses?: AddressCreateDto[];
}

export class CustomerRegisterRequestDto implements CustomerCreateInput {
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    declare email: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    declare password: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    declare firstName: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    declare lastName: string;

    @IsDateString()
    declare dateOfBirth?: string | Date;

    @IsDefined()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(2, { message: 'phoneNumbers must contain 2 elements' })
    @ArrayMaxSize(2, { message: 'phoneNumbers must contain 2 elements' })
    declare phoneNumbers: string[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddressCreateDto)
    declare addresses: AddressCreateDto[];
}