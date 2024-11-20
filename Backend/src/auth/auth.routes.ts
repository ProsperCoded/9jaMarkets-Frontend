import { Request, Response, Router } from "express";

import CustomerAuthRouter from './customer/customer.auth.routes';
import MarketAuthRouter from './merchant/merchant.auth.routes';
import passport from "passport";

const router = Router();

// Customer Authentication Routes
router.use('/customer', CustomerAuthRouter);

// Market Authentication Routes
router.use('/merchant', MarketAuthRouter);

// Google auth Base callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req: Request, res: Response)=>{
    const { profile, type } = req.user as any;
    const query = JSON.stringify(profile);
    res.redirect(`/api/v1/auth/${type}/google/callback/?profile=${query}`);
})

export default router;