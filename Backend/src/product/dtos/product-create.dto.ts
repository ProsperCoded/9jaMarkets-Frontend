import { $Enums, Prisma } from "@prisma/client";
import { IsDefined, IsIn, IsNumber, IsOptional, IsString } from "class-validator";

interface IProductCreateDto extends Omit<Prisma.ProductCreateInput, "displayImages" | "displayImage" | "merchant"> {}

export class ProductCreateDto implements IProductCreateDto {
    @IsDefined()
    @IsString()
    declare name: string;

    @IsDefined()
    @IsString()
    declare details: string;

    @IsDefined()
    @IsString()
    declare description: string;

    @IsOptional()
    @IsNumber()
    declare prevPrice: number;

    @IsDefined()
    @IsNumber()
    declare price: number;

    @IsDefined()
    @IsNumber()
    declare stock: number;

    @IsDefined()
    @IsString()
    @IsIn(Object.values($Enums.ProductCategory))
    declare category: $Enums.ProductCategory;
}