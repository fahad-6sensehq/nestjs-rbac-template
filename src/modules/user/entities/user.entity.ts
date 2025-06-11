import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'common/baseSchema/base.entity';
import { RegistrationTypeEnum } from 'common/enums/globalStatus.enum';
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

    @Prop({ type: String, enum: UserStatusEnum, default: UserStatusEnum.INVITED })
    status: UserStatusEnum;

    @Prop({ type: String, enum: RoleType, required: true })
    role: RoleType;

    @Prop({ type: String, enum: RegistrationTypeEnum, default: RegistrationTypeEnum.PASSWORD })
    registrationType: string;

    @Prop({ type: String })
    resetLink: string;

    @Prop({ type: Date, default: null })
    deactivateDate: string;

    @Prop({ type: String, default: null })
    avatar: string;

    @Prop({ type: Date, default: null })
    lastLogin: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true,
        index: true,
    })
    tenantId: mongoose.Schema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
