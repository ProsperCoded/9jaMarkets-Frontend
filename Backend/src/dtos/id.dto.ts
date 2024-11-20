import { IsString, IsUUID } from "class-validator";

export class IdDto{
    @IsString({message: "The Id you provided is not a valid string"})
    @IsUUID(undefined, {message: "The Id you provided is invalid"})
    declare id: string;

    @IsString({message: "The Id you provided is not a valid string"})
    @IsUUID(undefined, {message: "The Id you provided is invalid"})
    declare productId: string;

    @IsString({message: "The Id you provided is not a valid string"})
    @IsUUID(undefined, {message: "The Id you provided is invalid"})
    declare customerId: string;

    @IsString({message: "The Id you provided is not a valid string"})
    @IsUUID(undefined, {message: "The Id you provided is invalid"})
    declare marketId: string;

    @IsString({message: "The Id you provided is not a valid string"})
    @IsUUID(undefined, {message: "The Id you provided is invalid"})
    declare merchantId: string;

    @IsString({message: "The Id you provided is not a valid string"})
    @IsUUID(undefined, {message: "The Id you provided is invalid"})
    declare ratingId: string;
}