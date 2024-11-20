import bcrypt from 'bcrypt';
import { IBcryptService } from './bcrypt.service.interface';

export class BcryptService implements IBcryptService {
    public async hashPassword(password: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                resolve(hashedPassword);
            } catch (error) {
                reject(error);
            }
        });
    }

    public async comparePassword(password: string, hash: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const isCorrect = await bcrypt.compare(password, hash);
                resolve(isCorrect);
            } catch (error) {
                reject(error);
            }
        });
    }
}
