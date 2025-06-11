import { ReceiveUpdateEnum } from 'common/enums/receiveUpdate.enum';
import { RoleType } from 'common/enums/role.enum';
import { Document, Types } from 'mongoose';

export enum UserStatusEnum {
    INVITED = 'invited',
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export interface IUser extends Document {
    _id: Types.ObjectId;
    userId?: string;
    email: string;
    password?: string;
    name: string;
    phone: string | null;
    status: UserStatusEnum;
    role: RoleType;
    registrationType: string;
    receiveUpdate: ReceiveUpdateEnum;
    isVerified: boolean;
    isRegistered: boolean;
    resetLink?: string | null;
    deactivateDate: string;
    verificationCode: string;
    avatar: string | null;
    lastLogin: string | null;
    clientId: any;
    vendorId: any;
    createdBy?: any;
    scopes?: string[];
    address?: any;
}

export interface IUserListQuery {
    page?: string;
    size?: string;
    search?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
}
