import { IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EmailVerificationRequestDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  declare email: string;
}