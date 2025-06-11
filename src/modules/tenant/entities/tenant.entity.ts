import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TenantDocument = HydratedDocument<Tenant>;

@Schema({ timestamps: true })
export class Tenant {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    secret: string;

    @Prop({ type: String, default: null })
    domain: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
