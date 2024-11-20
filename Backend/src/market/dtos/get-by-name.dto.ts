import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class GetByNameDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    declare name: string;
}