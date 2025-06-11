// import { HttpStatus } from '@nestjs/common';
// import { appConfig } from 'app.config';
// import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
// import { promisify } from 'util';
// import { ExceptionHelper } from './ExceptionHelper';

// export class EINSecureHelper {
//     static async encrypt(text: string): Promise<string> {
//         const secretKey = appConfig.encryptionKey;
//         const key = (await promisify(scrypt)(secretKey, appConfig.salt, 32)) as Buffer;
//         const iv = Buffer.from(secretKey, 'hex');
//         const cipher = createCipheriv('aes-256-ctr', key, iv);
//         const encryptedText = Buffer.concat([cipher.update(text), cipher.final()]);

//         return encryptedText.toString('hex');
//     }

//     static async decrypt(text: string): Promise<string> {
//         const secretKey = appConfig.encryptionKey;
//         const iv = Buffer.from(secretKey, 'hex');
//         const key = (await promisify(scrypt)(secretKey, appConfig.salt, 32)) as Buffer;
//         const buffer = Buffer.from(text, 'hex');
//         const decipher = createDecipheriv('aes-256-ctr', key, iv);
//         const decryptedText = Buffer.concat([decipher.update(buffer), decipher.final()]);

//         return decryptedText?.toString();
//     }

//     static async hashEin(ein: string): Promise<string> {
//         try {
//             return await EINSecureHelper.encrypt(ein);
//         } catch (error) {
//             ExceptionHelper.getInstance().defaultError(error?.message, error?.code, HttpStatus.BAD_REQUEST);
//         }
//     }
// }
