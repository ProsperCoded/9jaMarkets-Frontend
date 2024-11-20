import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  declare email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  declare password: string;
}