import { EmailVerificationRequestDto } from "../dtos/email-verification-request.dto";
import { ForgotPasswordRequestDto } from "../dtos/forgot-password-request.dto";
import { LoginRequestDto } from "../dtos/login-request.dto";
import { LoginResponseDto } from "../dtos/login-response.dto";
import { ResetPasswordRequestDto } from "../dtos/reset-password-request.dto";
import { VerifyEmailRequestByCodeDto, VerifyEmailRequestByTokenDto } from "../dtos/verify-email-request.dto";


export interface IAuthService {
    login(loginData: LoginRequestDto): Promise<LoginResponseDto>;
    register(registerData: any, url:string): Promise<boolean>;
    forgotPassword(forgotPasswordData: ForgotPasswordRequestDto, url: string): Promise<boolean>;
    resetPassword(resetPasswordData: ResetPasswordRequestDto): Promise<boolean>;
    emailVerification(emailVerificationData: EmailVerificationRequestDto, url: string): Promise<boolean>;
    verifyEmail(verifyEmailData: VerifyEmailRequestByCodeDto | VerifyEmailRequestByTokenDto): Promise<boolean>;
}