import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TenantInvitationStatus } from '../enums/tenantInvitationStatus.enum';

export type TenantInvitationDocument = HydratedDocument<TenantInvitation>;

@Schema({ timestamps: true })
export class TenantInvitation {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true })
    inviteeUserId: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true })
    invitedByUserId: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', index: true })
    tenantId: mongoose.Schema.Types.ObjectId;

    @Prop({ default: TenantInvitationStatus.PENDING })
    status: TenantInvitationStatus;

    @Prop({ default: null })
    expiresAt: Date;
}

export const TenantInvitationSchema = SchemaFactory.createForClass(TenantInvitation);
