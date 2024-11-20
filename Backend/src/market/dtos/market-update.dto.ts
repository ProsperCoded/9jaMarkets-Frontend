import { IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { MarketCreateDto } from "./market-create.dto";

export class MarketUpdateDto implements Partial<MarketCreateDto> {
    @IsOptional()
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    address?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    city?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    state?: string;
}