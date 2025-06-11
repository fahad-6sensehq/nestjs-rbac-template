import { JwtService } from '@nestjs/jwt';
import { appConfig } from 'app.config';
import * as bcrypt from 'bcryptjs';
import { Timer } from 'common/constants/timer.constants';
import { IUser } from 'modules/user/interface/user.interface';

export class AuthHelper {
    // private static instance: AuthHelper;
    // constructor() {}

    // static getInstance(): AuthHelper {
    //     AuthHelper.instance = AuthHelper.instance || new AuthHelper();
    //     return AuthHelper.instance;
    // }

    static generateToken = (user, jwt: JwtService) => {
        delete user.password;

        const accessToken = this.generateAccessToken(user, jwt);
        const refreshToken = this.generateRefreshToken(user, jwt);
        return { auth: { accessToken: accessToken, refreshToken: refreshToken }, user: user };
    };

    static generateAccessToken = (user: IUser, jwt: JwtService): string => {
        return jwt.sign({ email: user.email, userId: user._id }, { expiresIn: Timer.DAY, secret: appConfig.jwtSecret });
    };

    static generateRefreshToken = (user: IUser, jwt: JwtService): string => {
        return jwt.sign(
            { email: user.email, userId: user['id'] },
            { expiresIn: Timer.DAY, secret: appConfig.jwtSecret },
        );
    };

    // async processRefreshToken(token: string, jwt: JwtService, userModel: Model<IUser, IUserKey>): Promise<any> {
    //     try {
    //         const jwtObject = await jwt.verify(token, { secret: appConfig.jwtAccessToken });
    //         if (jwtObject) {
    //             const usr = await userModel.findOne({ email: jwtObject['email'] }).exec();
    //             const companyId = jwtObject['company'];
    //             if (!NestHelper.getInstance().isEmpty(companyId)) {
    //                 usr[0]['companyId'] = companyId;
    //             }
    //             return usr[0];
    //         } else {
    //             return null;
    //         }
    //     } catch (err) {
    //         throw new UnauthorizedException('Invalid token');
    //     }
    // }

    // checkPassword = async (email: string, password: string, userModel: Model<IUser, IUserKey>): Promise<IUser> => {
    //     const usr = await userModel.findOne({ email }).exec();
    //     if (!NestHelper.getInstance().isEmpty(usr[0]?.password)) {
    //         if (usr[0] && (await bcrypt.compare(password, usr[0].password))) {
    //             return usr[0];
    //         }
    //     } else {
    //         ExceptionHelper.getInstance().userDoesNotExist();
    //     }
    //     return null;
    // };

    static isPasswordMatched = async (password: string, userPass: string): Promise<boolean> => {
        return await bcrypt.compare(password, userPass);
    };

    static hashPassword = async (password: string): Promise<string> => {
        return await bcrypt.hash(password, 12);
    };

    static validatePassword = async (password: string): Promise<string[]> => {
        const errors: string[] = [];

        if (password.length < 8) errors.push('Password must be at least 8 characters long.');
        if (!/[A-Z]/.test(password)) errors.push('Password must have at least one uppercase letter.');
        if (!/[a-z]/.test(password)) errors.push('Password must have at least one lowercase letter.');
        if (!/\d/.test(password)) errors.push('Password must have at least one number.');
        // if (!/[#?!@$%^&*-]/.test(password)) errors.push('Password must have at least one special character.');

        return errors.length > 0 ? errors : [];
    };
}
