import { Router } from "express";
import { MerchantAuthController } from "./merchant.auth.controller";
import { MerchantAuthService } from "./merchant.auth.service";
import { WinstonLogger } from "../../utils/logger/winston.logger";
import { BcryptService } from "../../utils/bcrypt/bcrypt.service";
import { JWTService } from "../../utils/jwt/jwt.service";
import { MerchantRepository } from "../../repositories/merchant.repository";
import { Validator } from "../../utils/middlewares/validator.middleware";
import { LoginRequestDto } from "../dtos/login-request.dto";
import { MerchantRegisterRequestDto } from "../dtos/merchant-register-request.dto";
import { EmailVerificationRequestDto } from "../dtos/email-verification-request.dto";
import { VerifyEmailRequestByCodeDto, VerifyEmailRequestByTokenDto } from "../dtos/verify-email-request.dto";
import { ForgotPasswordRequestDto } from "../dtos/forgot-password-request.dto";
import { ResetPasswordRequestDto } from "../dtos/reset-password-request.dto";
import passport from "passport";
import { MarketRepository } from "../../repositories/market.repository";

const router = Router();
const validator = new Validator();

// Merchant Auth Service Dependencies
const logger = new WinstonLogger('MerchantAuthService');
const bcryptService = new BcryptService();
const jwtService = new JWTService();
const merchantRepository = new MerchantRepository();
const marketRepository = new MarketRepository();


// Merchant Auth Service
const merchantAuthService = new MerchantAuthService(logger, bcryptService, jwtService, merchantRepository, marketRepository);

// Merchant Auth Controller
const merchantAuthController = new MerchantAuthController(merchantAuthService);

// Login Route
router.post('/login', validator.single(LoginRequestDto), merchantAuthController.login);

// Register Route
router.post('/signup', validator.single(MerchantRegisterRequestDto), merchantAuthController.register);

// Email Verification Route
router.post('/email-verification', validator.single(EmailVerificationRequestDto), merchantAuthController.emailVerification);

// Verify Email By Token Param Route
router.post('/verify-email-token', validator.single(VerifyEmailRequestByTokenDto, "query"), merchantAuthController.verifyEmailByQuery);

// Verify Email Route
router.post('/verify-email', validator.single(VerifyEmailRequestByCodeDto), merchantAuthController.verifyEmail);

// Forgot Password Route
router.post('/forgot-password', validator.single(ForgotPasswordRequestDto), merchantAuthController.forgotPassword);

// Reset Password Route
router.put('/reset-password', validator.single(ResetPasswordRequestDto), merchantAuthController.resetPassword);

// Refresh Access Token Route
router.post('/refresh-token', merchantAuthController.refreshToken);

// Google Auth Initiator Route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false, state: 'merchant' }));

// Google Auth Callback Route
router.get('/google/callback', merchantAuthController.googleAuth);

// Exchange Google token
router.get("/exchange-token", merchantAuthController.exchangeToken)

// Logout Route
router.delete('/logout', merchantAuthController.logout);

export default router;