import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class DataSecurityHelper {
    private static readonly algorithm: string = 'aes-256-cbc';
    private static readonly ENC = 'bf3c199c2470cb477d907b1e0917c17b';
    private static readonly IV = '5183666c72eec9e4';

    static encrypt(text: string): string {
        const cipher = crypto.createCipheriv(this.algorithm, this.ENC, this.IV);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    static decrypt(encryptedText: string): string {
        const decipher = crypto.createDecipheriv(this.algorithm, this.ENC, this.IV);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
