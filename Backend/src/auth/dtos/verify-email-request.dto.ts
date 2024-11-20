import { IsByteLength, IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";


export interface IVerifyEmailRequest{
  email: string;
  verificationCode: string;
}

export class VerifyEmailRequestByTokenDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsByteLength(150, undefined, {message: "Your token is invalid"})
  declare token: string;
}

export class VerifyEmailRequestByCodeDto{
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsByteLength(6, 6, {message: "Your code is invalid"})
  declare code: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  declare email: string;
}