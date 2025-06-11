import { HttpStatus } from '@nestjs/common';
import mongoose from 'mongoose';
import { ExceptionHelper } from './ExceptionHelper';
import { NestHelper } from './NestHelper';

export class MongooseHelper {
    private static instance: MongooseHelper;

    static getInstance(): MongooseHelper {
        MongooseHelper.instance = MongooseHelper.instance || new MongooseHelper();
        return MongooseHelper.instance;
    }

    isValidMongooseId(id: mongoose.Types.ObjectId | string, fieldName?: string): void {
        const errorCode = `invalid_${fieldName ? `${fieldName}_id` : 'id'}`;
        const errorMessage = `Invalid ${fieldName ? fieldName + ' id' : 'id'}`;

        const isValidMongooseId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidMongooseId) {
            ExceptionHelper.getInstance().defaultError(errorMessage, errorCode, HttpStatus.BAD_REQUEST);
        }
    }

    isNotValidMongooseIdThenMakeItNull(id: mongoose.Types.ObjectId): null | mongoose.Types.ObjectId {
        let isValidMongooseId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidMongooseId) return null;
        return id;
    }

    makeMongooseId(id: string): null | mongoose.Types.ObjectId {
        if (NestHelper.getInstance().isEmpty(id)) {
            return null;
        }

        let mongooseId: mongoose.Types.ObjectId | null = null;

        if (typeof id === 'string') {
            mongooseId = new mongoose.Types.ObjectId(id);
        }

        return mongooseId;
    }
}
