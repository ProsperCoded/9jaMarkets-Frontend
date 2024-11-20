import { EventEmitter } from "stream";
import { BcryptService } from "../../utils/bcrypt/bcrypt.service";
import { EmailService } from "../../utils/email/email.service";
import { JWTService } from "../../utils/jwt/jwt.service";
import { ILogger } from "../../utils/logger/logger.interface";
import { IAuthService } from "../interfaces/auth.service.interface";
import { eventEmmiter } from "../../utils/events";
import { EmailPaths, EmailSubjects } from "../../constants/email.enum";
import { LoginRequestDto } from "../dtos/login-request.dto";
import { LoginResponseDto } from "../dtos/login-response.dto";
import { cryptoService } from "../../utils/crytpo/crypto.service";
import { ErrorMessages } from "../../constants/error-messages.enum";
import { UnauthorizedException } from "../../utils/exceptions/unauthorized.exception";
import { BadRequestException } from '../../utils/exceptions/bad-request.exception';
import { InternalServerException } from '../../utils/exceptions/internal-server.exception';
import { EmailVerificationRequestDto } from "../dtos/email-verification-request.dto";
import { NotFoundException } from '../../utils/exceptions/not-found.exception';
import { ForgotPasswordRequestDto } from "../dtos/forgot-password-request.dto";
import { ResetPasswordRequestDto } from "../dtos/reset-password-request.dto";
import { MerchantRepository } from "../../repositories/merchant.repository";
import { MerchantRegisterRequestDto } from "../dtos/merchant-register-request.dto";
import { IVerifyEmailRequest, VerifyEmailRequestByCodeDto, VerifyEmailRequestByTokenDto } from "../dtos/verify-email-request.dto";
import { DataFormatterHelper } from "../../helpers/format.helper";
import { Prisma } from "@prisma/client";
import { MarketRepository } from "../../repositories/market.repository";
import { BaseException } from "../../utils/exceptions/base.exception";


export class MerchantAuthService implements IAuthService {
    private readonly logger: ILogger;
    private readonly bcryptService: BcryptService;
    private readonly jwtService: JWTService;
    private readonly emailService: EmailService;
    private readonly eventEmiter: EventEmitter;
    private readonly merchantRepository: MerchantRepository;
    private readonly marketRepository: MarketRepository;

    constructor(
        logger: ILogger,
        bcryptService: BcryptService,
        jwtService: JWTService,
        merchantRepository: MerchantRepository,
        marketRepository: MarketRepository
    ) {
        this.logger = logger;
        this.bcryptService = bcryptService;
        this.jwtService = jwtService;
        this.emailService = new EmailService();
        this.eventEmiter = eventEmmiter;
        this.merchantRepository = merchantRepository;
        this.marketRepository = marketRepository;
        this.initializeEventHandlers();
    }

    initializeEventHandlers() {
        this.eventEmiter.on(`sendMerchantPasswordResetEmail`, async (data: { email: string, token: string, resetCode: string, url: string }) => {
            const { email, token, resetCode, url } = data;
            const link = url + `?token=${token}`;
            await this.emailService.sendMail({
                to: email,
                subject: EmailSubjects.PASSWORD_RESET_MERCHANT,
                options: {
                    template: EmailPaths.PASSWORD_RESET,
                    data: { link, resetCode }
                }
            })
        });

        this.eventEmiter.on(`sendMerchantEmailVerificationEmail`, async (data: { email: string, token: string, verificationCode: number, url: string }) => {
            const { email, token, verificationCode, url } = data;
            const link = url + `/${token}`;
            await this.emailService.sendMail({
                to: email,
                subject: EmailSubjects.EMAIL_VERIFICATION_MERCHANT,
                options: {
                    template: EmailPaths.EMAIL_VERIFICATION,
                    data: { link, verificationCode }
                }
            })
        });

        this.eventEmiter.on(`sendMerchantWelcomeEmail`, async (data: { email: string, brandName: string, }) => {
            const { email, brandName } = data;
            await this.emailService.sendMail({
                to: email,
                subject: EmailSubjects.WELCOME,
                options: {
                    template: EmailPaths.WELCOME,
                    data: { brandName }
                }
            })
        });

    }

    private getToken(payload: { [key: string]: any }, expiresIn: string = "15m"): string {
        const hash = this.jwtService.signPayload(payload, expiresIn);
        const token = cryptoService.encrypt(hash);
        return token;
    }

    private getPayload(token: string): { [key: string]: any } {
        const decrypted = cryptoService.decrypt(token);
        const payload = this.jwtService.verifyToken(decrypted);
        return payload;
    }

    private getVerifyEmailData(data: VerifyEmailRequestByCodeDto | VerifyEmailRequestByTokenDto): IVerifyEmailRequest {
        let result: IVerifyEmailRequest;
        if ("code" in data) {
            result = { email: data.email, verificationCode: data.code };
        } else {
            const token = decodeURIComponent(data.token)
            result = <IVerifyEmailRequest>this.getPayload(token);
        }
        return result;
    }

    async login(loginData: LoginRequestDto): Promise<LoginResponseDto> {
        try {
            const { email, password } = loginData;
    
            const merchant = await this.merchantRepository.getMerchantByEmail(email);
            if (!merchant) {
                this.logger.error(ErrorMessages.INVALID_EMAIL_PASSWORD);
                throw new UnauthorizedException(ErrorMessages.INVALID_EMAIL_PASSWORD);
            }
    
            const isPasswordMatch = await this.bcryptService.comparePassword(password, merchant.password!);
            if (!isPasswordMatch) {
                this.logger.error(ErrorMessages.INVALID_EMAIL_PASSWORD);
                throw new UnauthorizedException(ErrorMessages.INVALID_EMAIL_PASSWORD);
            }
    
            const payload = { email: merchant.email, id: merchant.id };
            const accessToken = this.getToken(payload, "10h");
            const _refreshToken = cryptoService.random();
            const refreshToken = this.getToken({ email: merchant.email, refreshToken: _refreshToken }, "7d");
            await this.merchantRepository.update(merchant.id, { refreshToken: _refreshToken });
            const response = new LoginResponseDto();
            response.id = merchant.id;
            response.accessToken = accessToken;
            response.refreshToken = refreshToken;
            return response;
        } catch (error) {
            if (error instanceof BaseException) {
                throw error;
            }
            this.logger.error(`${ErrorMessages.LOGIN_FAILED}: ${error}`);
            throw new InternalServerException(ErrorMessages.LOGIN_FAILED);
        }
    }

    async register(registerData: MerchantRegisterRequestDto, url: string): Promise<boolean> {
        const {marketName, ...data} = registerData;
        const { email, brandName, password } = data;

        // Check if email is already registered
        const merchant = await this.merchantRepository.getMerchantByEmail(email);
        if (merchant) {
            this.logger.error(ErrorMessages.EMAIL_EXISTS);
            throw new BadRequestException(ErrorMessages.EMAIL_EXISTS);
        }

        // Check if BrandName already exists
        const merchantBrand = await this.merchantRepository.getMerchantByBrandName(brandName);
        if (merchantBrand) {
            this.logger.error(ErrorMessages.BRAND_NAME_EXISTS);
            throw new BadRequestException(ErrorMessages.BRAND_NAME_EXISTS);
        }

        // Ensure marketName exists
        const market = await this.marketRepository.findByName(marketName);
        if (!market) {
            this.logger.error(ErrorMessages.MARKET_NOT_EXISTS);
            throw new NotFoundException(ErrorMessages.MARKET_NOT_EXISTS);
        }


        try {
            const hashedPassword = await this.bcryptService.hashPassword(password);
            data.password = hashedPassword;

            // Create new merchant
            const { addresses, phoneNumbers, ...newMerchantData } = data;
            // Ensure addresses have different names
            const addressNames = addresses.map(address => address.name);
            if (new Set(addressNames).size !== addressNames.length) {
                this.logger.error(ErrorMessages.DUPLICATE_ADDRESS_NAME);
                throw new BadRequestException(ErrorMessages.DUPLICATE_ADDRESS_NAME);
            }
            const formattedPhoneNumbers = DataFormatterHelper.formatPhoneNumbers(phoneNumbers);
            const newMerchant = await this.merchantRepository.create(newMerchantData, addresses, formattedPhoneNumbers, marketName);

            // Send welcome email
            this.eventEmiter.emit("sendMerchantWelcomeEmail", { email, brandName });

            // Send email verification code
            const verificationCode = cryptoService.randomInt();
            await this.merchantRepository.update(newMerchant.id, { emailVerificationCode: verificationCode });
            const _token = this.getToken({ email, verificationCode });
            const token = encodeURIComponent(_token);
            this.eventEmiter.emit("sendMerchantEmailVerificationEmail", { email, token, verificationCode, url });
            return true;
        } catch (e) {
            if(e instanceof BaseException){
                throw e;
            }
            this.logger.error(`${ErrorMessages.REGISTER_MERCHANT_FAILED}: ${e}`);
            throw new InternalServerException(ErrorMessages.REGISTER_MERCHANT_FAILED);
        }
    }

    async emailVerification(emailVerificationData: EmailVerificationRequestDto, url: string): Promise<boolean> {
        const { email } = emailVerificationData;
        const merchant = await this.merchantRepository.getMerchantByEmail(email);
        if (!merchant) {
            this.logger.error(ErrorMessages.MERCHANT_NOT_FOUND);
            throw new NotFoundException(ErrorMessages.MERCHANT_NOT_FOUND);
        }
        const verificationCode = cryptoService.randomInt();
        await this.merchantRepository.update(merchant.id, { emailVerificationCode: verificationCode });
        const _token = this.getToken({ email, verificationCode });
        const token = encodeURIComponent(_token)
        this.eventEmiter.emit("sendMerchantEmailVerificationEmail", { email, token, verificationCode, url });
        return true;
    }

    async verifyEmail(verifyEmailData: VerifyEmailRequestByCodeDto | VerifyEmailRequestByTokenDto): Promise<boolean> {
        try {
            const { email, verificationCode } = this.getVerifyEmailData(verifyEmailData);
            const merchant = await this.merchantRepository.getMerchantByEmail(email);
            if (!merchant) {
                this.logger.error(ErrorMessages.MERCHANT_NOT_FOUND);
                throw new NotFoundException(ErrorMessages.MERCHANT_NOT_FOUND);
            }
            if (merchant.emailVerificationCode !== verificationCode) {
                this.logger.error(ErrorMessages.INVALID_VERIFICATION_TOKEN);
                throw new BadRequestException(ErrorMessages.INVALID_VERIFICATION_TOKEN);
            }
            await this.merchantRepository.update(merchant.id, { emailVerifiedAt: new Date(), emailVerificationCode: null });
            return true;
        } catch (e) {
            if (e instanceof BaseException) {
                throw e;
            }
            this.logger.error(`${ErrorMessages.INVALID_VERIFICATION_TOKEN}: ${e}`);
            throw new BadRequestException(ErrorMessages.INVALID_VERIFICATION_TOKEN);
        }

    }

    async forgotPassword(forgotPasswordData: ForgotPasswordRequestDto): Promise<boolean> {
        const { email } = forgotPasswordData;
        const merchant = await this.merchantRepository.getMerchantByEmail(email);
        if (!merchant) {
            this.logger.error(ErrorMessages.MERCHANT_NOT_FOUND);
            throw new NotFoundException(ErrorMessages.MERCHANT_NOT_FOUND);
        }
        const resetCode = cryptoService.randomInt();
        await this.merchantRepository.update(merchant.id, { passwordResetCode: resetCode });
        // const token = this.getToken({ email, resetCode });
        this.eventEmiter.emit("sendMerchantPasswordResetEmail", { email, resetCode });
        return true;
    }

    async resetPassword(resetPasswordData: ResetPasswordRequestDto): Promise<boolean> {
        try {
            const { resetCode, email, newPassword } = resetPasswordData;
            // const decrypted = cryptoService.decrypt(token);
            // const { email, resetCode } = this.jwtService.verifyToken(decrypted);
            const merchant = await this.merchantRepository.getMerchantByEmail(email);
            if (!merchant) {
                this.logger.error(ErrorMessages.MERCHANT_NOT_FOUND);
                throw new NotFoundException(ErrorMessages.MERCHANT_NOT_FOUND);
            }
            if (merchant.passwordResetCode !== resetCode) {
                this.logger.error(ErrorMessages.INVALID_RESET_TOKEN);
                throw new BadRequestException(ErrorMessages.INVALID_RESET_TOKEN);
            }
            const hashedPassword = await this.bcryptService.hashPassword(newPassword);
            await this.merchantRepository.update(merchant.id, { password: hashedPassword, passwordResetCode: null });
            return true;
        } catch (e) {
            if (e instanceof BaseException) {
                throw e;
            }
            this.logger.error(`${ErrorMessages.INVALID_RESET_TOKEN}: ${e}`);
            throw new BadRequestException(ErrorMessages.INVALID_RESET_TOKEN);
        }
    }

    async refreshToken(refreshToken: string): Promise<LoginResponseDto> {
        const payload = this.getPayload(refreshToken);
        const { email, refreshToken: _refreshToken } = payload;
        const merchant = await this.merchantRepository.getMerchantByEmail(email);
        if (!merchant) {
            this.logger.error(ErrorMessages.MERCHANT_NOT_FOUND);
            throw new NotFoundException(ErrorMessages.MERCHANT_NOT_FOUND);
        }
        if (!merchant.refreshToken) {
            this.logger.error(ErrorMessages.REFRESH_TOKEN_NOT_EXISTS);
            throw new UnauthorizedException(ErrorMessages.REFRESH_TOKEN_NOT_EXISTS);
        }
        if (merchant.refreshToken !== _refreshToken) {
            this.logger.error(ErrorMessages.INVALID_REFRESH_TOKEN);
            throw new UnauthorizedException(ErrorMessages.INVALID_REFRESH_TOKEN);
        }
        const newAccessToken = this.getToken({ email, id: merchant.id }, "10h");
        const response = new LoginResponseDto();
        response.id = merchant.id;
        response.accessToken = newAccessToken;
        response.refreshToken = refreshToken;
        return response;
    }

    async logout(refreshToken: string): Promise<boolean> {
        const payload = this.getPayload(refreshToken);
        const { email } = payload;
        const merchant = await this.merchantRepository.getMerchantByEmail(email);
        if (!merchant) {
            this.logger.error(ErrorMessages.MERCHANT_NOT_FOUND);
            throw new NotFoundException(ErrorMessages.MERCHANT_NOT_FOUND);
        }
        await this.merchantRepository.update(merchant.id, { refreshToken: null });
        return true;
    }

    async googleCreateOrLogin(profile: any): Promise<string> {
        const { emails: [{ value, verified }], id, name: { givenName }, photos } = profile;
        try {
            const merchant = await this.merchantRepository.getMerchantByGoogleId(id);
            if (!merchant) {
                let merchantData: Prisma.MerchantCreateInput = {
                    email: value,
                    googleId: id,
                    brandName: `${givenName}'s Store`,
                    emailVerifiedAt: verified ? new Date() : null,
                    displayImage: photos[0].value
                }
                const newMerchant = await this.merchantRepository.create(merchantData);
                const payload = { email: newMerchant.email, id: newMerchant.id };
                const accessToken = this.getToken(payload, "10h");
                const _refreshToken = cryptoService.random();
                const refreshToken = this.getToken({ email: newMerchant.email, refreshToken: _refreshToken }, "7d");
                await this.merchantRepository.update(newMerchant.id, { refreshToken: _refreshToken });
                const result = this.getToken({ id: newMerchant.id, accessToken, refreshToken }, "7m");
                return encodeURIComponent(result);
            } else {
                const payload = { email: merchant.email, id: merchant.id };
                const accessToken = this.getToken(payload, "10h");
                const _refreshToken = cryptoService.random();
                const refreshToken = this.getToken({ email: merchant.email, refreshToken: _refreshToken }, "7d");
                await this.merchantRepository.update(merchant.id, { refreshToken: _refreshToken });
                const result = this.getToken({ id: merchant.id, accessToken, refreshToken }, "7m");
                return encodeURIComponent(result);
            }
        } catch (e) {
            this.logger.error(`${ErrorMessages.GOOGLE_AUTH_FAILED}: ${e}`);
            throw new InternalServerException(ErrorMessages.GOOGLE_AUTH_FAILED);
        }
    }

    async exchangeToken(token: string): Promise<LoginResponseDto> {
        try {
            token = decodeURIComponent(token)
            const { id, accessToken, refreshToken } = this.getPayload(token);
            if (!id || !accessToken || !refreshToken) {
                this.logger.error(ErrorMessages.INVALID_EXCHANGE_TOKEN);
                throw new BadRequestException(ErrorMessages.INVALID_EXCHANGE_TOKEN);
            };
            const response = new LoginResponseDto();
            response.id = id;
            response.accessToken = accessToken;
            response.refreshToken = refreshToken;
            return response;
        } catch (e) {
            this.logger.error(`${ErrorMessages.INVALID_EXCHANGE_TOKEN}: ${e}`);
            throw new BadRequestException(ErrorMessages.INVALID_EXCHANGE_TOKEN);
        }
    }
}
