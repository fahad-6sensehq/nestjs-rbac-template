import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DefaultStatusEnum } from 'common/enums/status.enum';
import { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ timestamps: true })
export class Permission {
    @Prop({
        type: String,
        unique: true,
        required: true,
        index: true,
        trim: true,
        lowercase: true,
    })
    name: string;

    @Prop({
        type: String,
        enum: Object.values(DefaultStatusEnum),
        default: DefaultStatusEnum.ACTIVE,
        index: true,
    })
    status: string;

    @Prop({
        type: String,
        default: '',
        trim: true,
    })
    details: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
