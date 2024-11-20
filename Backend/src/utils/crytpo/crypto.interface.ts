export interface CryptoInterface {
    encrypt(data: string): string;
    decrypt(data: string): string;
    random(): string;
  }