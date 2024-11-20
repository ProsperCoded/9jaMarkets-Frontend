import { Prisma } from "@prisma/client";
import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";


export class RatingUpdateDto implements Prisma.RatingUpdateInput {
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsString()
  @IsNotEmpty()
  review?: string;
}