import { DefaultStatusEnum } from 'common/enums/status.enum';
import { Document, Types } from 'mongoose';

export interface IRole extends Document {
    _id: string | Types.ObjectId;
    name: string;
    status: DefaultStatusEnum;
    details: string;
}
