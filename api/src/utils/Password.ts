import argon2 from 'argon2';
import { config } from '../config/config.js';

export class Password {
    private static readonly salt = config.apiSecret;

    static async hashPassword(plainPassword: string): Promise<string> {
        const hashPwd = await argon2.hash(plainPassword, { secret: Buffer.from(this.salt) })
        return hashPwd;
    }

    static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        const isMatch = await argon2.verify(hashedPassword, plainPassword, { secret: Buffer.from(this.salt) });
        return isMatch;
    }
}