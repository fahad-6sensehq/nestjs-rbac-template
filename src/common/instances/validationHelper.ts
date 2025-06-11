import { HttpStatus } from '@nestjs/common';
import mongoose from 'mongoose';
import { ExceptionHelper } from './ExceptionHelper';

export class ValidationHelper {
    static validateAccessCompanyData(
        dataCompanyId: mongoose.Types.ObjectId,
        userCompanyId: mongoose.Types.ObjectId,
    ): void {
        if (dataCompanyId?.toString() !== userCompanyId?.toString()) {
            ExceptionHelper.getInstance().defaultError(
                'You are not authorized to access',
                'forbidder',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
