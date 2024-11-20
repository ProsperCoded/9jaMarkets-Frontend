import { IsNumber } from "class-validator";

export class AddToCartDto {
    @IsNumber()
    declare quantity: number;
}