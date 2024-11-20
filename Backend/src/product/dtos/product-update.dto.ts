import { $Enums, Prisma } from "@prisma/client";
import { IsArray, IsIn, IsNumber, IsString } from "class-validator";


export class ProductUpdateDto implements Prisma.ProductUpdateInput {
    @IsString()
    name?: string;

    @IsString()
    details?: string;

    @IsString()
    description?: string;

    @IsNumber()
    prevPrice?: number;

    @IsNumber()
    price?: number;

    @IsNumber()
    stock?: number;

    @IsArray()
    @IsString({ each: true })
    @IsIn(Object.values($Enums.ProductCategory), { each: true })
    category?: Prisma.EnumProductCategoryFieldUpdateOperationsInput | $Enums.ProductCategory | undefined;
}