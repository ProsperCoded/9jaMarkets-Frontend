import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { AppEnum } from '../constants/app.enum';
import { configService } from '../utils/config/config.service';

class PassportConfig {

    constructor() {
        this.initialize();
    }

    private initialize() {
        passport.use(new GoogleStrategy({
            clientID: configService.get<string>("GOOGLE_CLIENT_ID")!,
            clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET")!,
            passReqToCallback: true,
            callbackURL: `${AppEnum.BASE_URL}/auth/google/callback`,
        }, async (req, accessToken, refreshToken, profile, done) => {
            try {
                const type = req.query.state || 'customer';
                done(null, {profile, type});
            } catch (err) {
                done(err, false);
            }
        }));
        // Disable session support by no-oping serializeUser and deserializeUser
        passport.serializeUser((user, done) => done(null, user));  // no-op for serialize
        passport.deserializeUser((user: any, done) => done(null, user));  // no-op for deserialize
    }
}

export default new PassportConfig();