import { Prisma } from "@prisma/client";
import { IsDefined, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class RatingCreateDto implements Omit<Prisma.RatingCreateWithoutCustomerInput, "product"> {
    @IsDefined()
    @IsInt()
    @Min(1)
    @Max(5)
    declare rating: number;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    declare review: string;
}