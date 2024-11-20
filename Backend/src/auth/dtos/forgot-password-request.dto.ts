import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordRequestDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  declare email: string;
}