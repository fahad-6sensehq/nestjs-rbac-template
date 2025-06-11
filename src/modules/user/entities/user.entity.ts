import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'common/baseSchema/base.entity';
import { RegistrationTypeEnum } from 'common/enums/globalStatus.enum';
import { ReceiveUpdateEnum } from 'common/enums/receiveUpdate.enum';
import { RoleType } from 'common/enums/role.enum';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserStatusEnum } from '../interface/user.interface';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends BaseSchema {
    @Prop({ type: String, required: true, index: true })
    email: string;

    @Prop({ type: String, required: false })
    password: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String })
    phone: string;

    @Prop({ type: String, enum: UserStatusEnum, default: UserStatusEnum.INVITED })
    status: UserStatusEnum;

    @Prop({ type: String, enum: RoleType, required: true })
    role: RoleType;

    @Prop({ type: String, enum: RegistrationTypeEnum, default: RegistrationTypeEnum.PASSWORD })
    registrationType: string;

    @Prop({ type: Boolean, default: false })
    isVerified: boolean;

    @Prop({ type: Boolean, default: true })
    isRegistered: boolean;

    @Prop({ type: String })
    resetLink: string;

    @Prop({ type: Date, default: null })
    deactivateDate: string;

    @Prop({ type: String, default: null })
    verificationCode: string;

    @Prop({ type: String, default: null })
    avatar: string;

    @Prop({ type: String, default: null })
    stripeCustomerId: string;

    @Prop({ type: String, enum: [ReceiveUpdateEnum] })
    receiveUpdate: ReceiveUpdateEnum;

    @Prop({ type: Date, default: null })
    lastLogin: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        // required: true,
        index: true,
    })
    vendorId: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
        index: true,
    })
    clientId: mongoose.Schema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1, clientId: 1 }, { unique: true });
