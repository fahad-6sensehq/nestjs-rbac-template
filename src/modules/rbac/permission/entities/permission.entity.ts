import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DefaultStatusEnum } from 'common/enums/status.enum';
import { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ timestamps: true })
export class Permission {
    @Prop({ type: String, unique: true, required: true, index: true })
    name: String;

    @Prop({
        type: String,
        enum: [DefaultStatusEnum],
        default: DefaultStatusEnum.ACTIVE,
    })
    status: String;

    @Prop({ type: String, default: '' })
    details: String;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
