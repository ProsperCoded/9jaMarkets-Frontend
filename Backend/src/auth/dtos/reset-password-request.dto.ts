import { IsByteLength, IsDefined, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ResetPasswordRequestDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    declare newPassword: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsByteLength(6, 6, { message: "Your code is invalid" })
    declare resetCode: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    declare email: string;
}