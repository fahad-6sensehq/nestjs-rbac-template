import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserSessionDocument = HydratedDocument<UserSession>;

@Schema({ timestamps: true })
export class UserSession {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    accessToken: string;

    @Prop({ required: true })
    refreshToken: string;

    @Prop()
    userAgent?: string;

    @Prop()
    ipAddress?: string;

    @Prop()
    deviceType?: string;

    @Prop()
    os?: string;

    @Prop()
    browser?: string;

    @Prop({ required: true })
    expiresAt: Date;

    @Prop({ default: false })
    isRevoked: boolean;
}

export const UserSessionSchema = SchemaFactory.createForClass(UserSession);

UserSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
