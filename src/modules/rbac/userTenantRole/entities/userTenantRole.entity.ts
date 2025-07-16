import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DefaultStatusEnum } from 'common/enums/status.enum';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserTenantRoleDocument = HydratedDocument<UserTenantRole>;

@Schema({ timestamps: true })
export class UserTenantRole {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true })
    userId: string;

    @Prop({ type: String, required: true })
    roleName: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true, index: true })
    roleId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true })
    tenantId: string;

    @Prop({ type: String, enum: [DefaultStatusEnum], default: DefaultStatusEnum.ACTIVE })
    status: string;
}

export const UserTenantRoleSchema = SchemaFactory.createForClass(UserTenantRole);
