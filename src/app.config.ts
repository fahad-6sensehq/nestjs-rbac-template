import * as dotenv from 'dotenv';
dotenv.config();

export interface IConfig {
    port: number;
    mongodbURL: string;
    jwtSecret: string;
}

const getAppConfig = (): IConfig => {
    const port = 9000;
    const mongodbURL = process.env.MONGODB_URL || '';
    const jwtSecret = process.env.JWT_SECRET || '';

    if (!port) console.log('port must be specified');
    if (!mongodbURL) console.log('mongodbURL must be specified');
    if (!jwtSecret) console.log('jwtSecret must be specified');

    return {
        port,
        mongodbURL,
        jwtSecret,
    };
};
export const appConfig = getAppConfig();
