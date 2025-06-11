import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DefaultStatusEnum } from 'common/enums/status.enum';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
    @Prop({ required: true, unique: true, index: true })
    name: string;

    @Prop({ type: String, enum: [DefaultStatusEnum], default: DefaultStatusEnum.ACTIVE })
    status: DefaultStatusEnum;

    @Prop({ type: String, default: '' })
    details: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
