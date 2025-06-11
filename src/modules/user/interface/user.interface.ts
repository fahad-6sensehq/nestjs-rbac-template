import { RoleType } from 'common/enums/role.enum';
import { Document } from 'mongoose';

export enum UserStatusEnum {
    INVITED = 'invited',
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export interface IUser extends Document {
    email: string;
    password?: string;
    name: string;
    status: UserStatusEnum;
    role: RoleType;
    roleId: any;
    registrationType: string;
    resetLink?: string | null;
    deactivateDate: string;
    avatar: string | null;
    lastLogin: string | null;
    tenantId: any;
    createdBy?: any;
    userId?: string;
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
