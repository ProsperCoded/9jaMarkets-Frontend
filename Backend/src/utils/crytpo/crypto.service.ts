import { createCipheriv, createDecipheriv, createHash, randomBytes, randomInt } from 'crypto';
import { configService } from '../config/config.service';
import { CryptoInterface } from './crypto.interface';

class CryptoService implements CryptoInterface {
    protected static readonly key: Buffer = createHash('sha256').update(String(configService.get<string>('CRYPTO_KEY'))).digest().slice(0, 32);
    protected static readonly iv: Buffer = createHash('sha256').update(String(configService.get<string>('CRYPTO_IV'))).digest().slice(0, 16);
    private readonly encryptionAlgorithm: string = configService.get<string>('CRYPTO_ENCRYPTION_ALGORITHM') as string;
    private static instance: CryptoService;

    encrypt(text: string) {
        const cipher = createCipheriv(this.encryptionAlgorithm, CryptoService.key, CryptoService.iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return Buffer.from(encrypted, 'hex').toString('base64');
    }

    decrypt(text: string) {
        const encryptedText = Buffer.from(text, 'base64').toString('hex');
        const decipher = createDecipheriv(this.encryptionAlgorithm, CryptoService.key, CryptoService.iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    random(): string {
      return randomBytes(16).toString();
    }

    randomInt(): string{
      return randomInt(100000, 1000000).toString();
    }

    static getInstance(): CryptoService {
        if (!this.instance) {
          this.instance = new CryptoService();
        }
        return this.instance;
      }
}

export const cryptoService = CryptoService.getInstance(); // To return an instance of the CryptoService class
