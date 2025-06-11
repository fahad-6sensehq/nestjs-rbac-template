import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DefaultStatusEnum } from 'common/enums/status.enum';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserRoleDocument = HydratedDocument<UserRole>;

@Schema({ timestamps: true })
export class UserRole {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true })
    userId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role', index: true })
    roleId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client', index: true })
    clientId: string;

    @Prop({ type: String, enum: [DefaultStatusEnum], default: DefaultStatusEnum.ACTIVE })
    status: string;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
