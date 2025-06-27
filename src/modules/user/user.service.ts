import { BadRequestException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleType } from 'common/enums/role.enum';
import { AggregationHelper } from 'common/instances/aggregation.helper';
import { AuthHelper } from 'common/instances/auth.helper';
import { ConstructObjectFromDto } from 'common/instances/constructObjectFromDTO';
import { ExceptionHelper } from 'common/instances/ExceptionHelper';
import { Utils } from 'common/instances/utils';
import { IPermission } from 'modules/rbac/permission/interface/permission.interface';
import { RoleService } from 'modules/rbac/role/role.service';
import { UserRoleService } from 'modules/rbac/userRole/userRole.service';
import { IUser, IUserListQuery, UserStatusEnum } from 'modules/user/interface/user.interface';
import { Model, PipelineStage, Types } from 'mongoose';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { User, UserDocument } from './entities/user.entity';
import { UserSession, UserSessionDocument } from './entities/userSession.entity';
import { IUserSession } from './interface/userSession.interface';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
        @InjectModel(UserSession.name)
        private readonly userSessionModel: Model<UserSessionDocument>,
        private readonly userRoleService: UserRoleService,
        private readonly roleService: RoleService,
    ) {}

    async createUser(createUser: CreateUserDto, user?: IUser): Promise<any> {
        const userExists = await this.userModel.findOne({ email: createUser.email }).lean();
        if (userExists) {
            return ExceptionHelper.getInstance().defaultError(
                'User already exists',
                'user_already_exists',
                HttpStatus.BAD_REQUEST,
            );
        }

        const role = await this.roleService.findByName(createUser.role);
        if (!role) {
            return ExceptionHelper.getInstance().defaultError(
                'Role does not exist',
                'role_does_not_exist',
                HttpStatus.BAD_REQUEST,
            );
        }

        let userObj;
        if (user) {
            userObj = ConstructObjectFromDto.constructCreateUserObject(createUser, user);
        } else {
            userObj = ConstructObjectFromDto.constructMainAdminObject(createUser);
        }

        const newUser = await this.userModel.create(userObj);

        await this.userRoleService.create({
            userId: newUser._id.toString(),
            roleId: role._id.toString(),
            tenantId: String(newUser.tenantId),
        });

        return newUser;
    }

    async createMainAdmin(createUser: CreateUserDto): Promise<any> {
        return this.createUser(createUser);
    }

    async create(createUser: CreateUserDto, user: IUser): Promise<any> {
        return this.createUser(createUser, user);
    }

    async findAll(user: IUser, query: IUserListQuery): Promise<{ data?: IUser[]; count?: number }> {
        const { aggregate, page, size } = Utils.defineListRule(query);

        AggregationHelper.filterByMatchAndQueriesAll(aggregate, [
            { tenantId: new Types.ObjectId(`${user?.tenantId}`) },
        ]);

        AggregationHelper.searchByNameAndEmail(aggregate, query);

        AggregationHelper.projectFields(aggregate, ['password', 'resetLink']);
        AggregationHelper.getCountAndDataByFacet(aggregate, +page, +size);

        const users = await this.userModel.aggregate(aggregate);

        if (users.length === 0) {
            return { data: [], count: 0 };
        }

        return Utils.returnListResponse(users);
    }

    async findOneData(id: string): Promise<any> {
        const objId = new Types.ObjectId(id);

        const aggregate: PipelineStage[] = [];
        AggregationHelper.filterByMatchAndQueriesAll(aggregate, [{ _id: objId }]);

        AggregationHelper.lookupForIdLocalKey(aggregate, 'userroles', 'userId', 'userRole');
        AggregationHelper.unwindAField(aggregate, 'userRole', true);

        AggregationHelper.lookupForCustomFields(
            aggregate,
            'rolepermissions',
            'userRole.roleId',
            'roleId',
            'rolePermissions',
        );

        AggregationHelper.lookupForIdForeignKey(
            aggregate,
            'permissions',
            'rolePermissions.permissionId',
            'permissions',
        );

        AggregationHelper.projectFields(aggregate, ['password', 'resetLink', 'userRole', 'rolePermissions']);

        const result = await this.userModel.aggregate(aggregate).exec();

        if (!result.length) return null;

        let scopes = result[0].permissions.map((permission: IPermission) => permission.name);

        delete result[0].permissions;

        return {
            ...result[0],
            scopes: [...scopes],
        };
    }

    async find(id: string): Promise<IUser> {
        return await this.findOneData(id);
    }

    async findByEmail(email: string): Promise<IUser> {
        return await this.userModel.findOne({ email }).lean().exec();
    }

    async findById(id: string): Promise<IUser> {
        const user = await this.userModel.findById(id).lean();

        if (!user) {
            throw ExceptionHelper.getInstance().throwUserNotFoundException();
        }

        return user;
    }

    async getUser(id: string, user: IUser): Promise<IUser> {
        const aggregate: PipelineStage[] = [];

        AggregationHelper.filterByMatchAndQueriesAll(aggregate, [
            { tenantId: new Types.ObjectId(`${user.tenantId}`) },
            { _id: new Types.ObjectId(id) },
        ]);

        AggregationHelper.getUserAddress(aggregate);

        const users = await this.userModel.aggregate(aggregate).exec();

        if (!users.length) {
            ExceptionHelper.getInstance().throwUserNotFoundException();
        }

        return users[0];
    }

    async isSuperAdmin(id: string): Promise<boolean> {
        const user = await this.userModel.findById(id).lean();

        if (!user) {
            throw ExceptionHelper.getInstance().throwUserNotFoundException();
        }

        if (user.role !== RoleType.SUPER_ADMIN) {
            throw ExceptionHelper.getInstance().defaultError(
                'User not super admin',
                'user_not_super_admin',
                HttpStatus.BAD_REQUEST,
            );
        }

        return true;
    }

    async updateUserLastLogin(userId: string, lastLogin: string): Promise<IUser> {
        return await this.userModel.findByIdAndUpdate({ _id: userId }, { lastLogin }, { new: true }).exec();
    }

    async updateResetLink(userId: string, code: string | null): Promise<IUser> {
        return await this.userModel.findByIdAndUpdate({ _id: userId }, { resetLink: code }, { new: true }).exec();
    }

    async updateStatus(userId: string, status: UserStatusEnum): Promise<IUser> {
        return await this.userModel
            .findByIdAndUpdate({ _id: userId }, { status, deactivateDate: new Date() }, { new: true })
            .exec();
    }

    async getUserByResetLink(resetLink: string): Promise<IUser> {
        return await this.userModel.findOne({ resetLink }).lean();
    }

    async updatePassword(id: string, pass: string, isSetupPassword: boolean): Promise<IUser> {
        let updatedData: { password: string; status?: UserStatusEnum } = { password: pass };

        if (isSetupPassword) {
            updatedData = { ...updatedData, status: UserStatusEnum.ACTIVE };
        }

        const res = await this.userModel.findByIdAndUpdate({ _id: id }, updatedData, {
            new: true,
            projection: { password: 0 },
        });

        return res;
    }

    async isUniqueEmail(email: string): Promise<any> {
        const user = await this.userModel.findOne({ email }).lean();

        if (user) {
            ExceptionHelper.getInstance().defaultError(
                `Email already exists#${email}`,
                'email_already_exists',
                HttpStatus.CONFLICT,
            );
        }

        return { success: true };
    }

    async changePassword(id: string, dto: ChangePasswordDto) {
        if (dto.newPassword !== dto.confirmNewPassword) {
            ExceptionHelper.getInstance().defaultError(
                'Password do not match',
                'password_do_not_match',
                HttpStatus.CONFLICT,
            );
        }

        const isValidPassword = await AuthHelper.validatePassword(dto.newPassword);

        if (isValidPassword.length > 0) {
            ExceptionHelper.getInstance().passwordValidation();
        }

        const user = await this.userModel.findById(new Types.ObjectId(id)).lean();

        if (!user.password) {
            ExceptionHelper.getInstance().throwUserNotFoundException();
        }

        const isPasswordMatched = await AuthHelper.isPasswordMatched(dto.oldPassword, user.password);

        if (!isPasswordMatched) {
            throw new BadRequestException('Invalid password');
        }

        const repeatOldPassword = await AuthHelper.isPasswordMatched(dto.newPassword, user.password);
        if (repeatOldPassword) {
            ExceptionHelper.getInstance().defaultError(
                'New password cannot be old password',
                'new_password_cannot_be_old_password',
                HttpStatus.BAD_REQUEST,
            );
        }

        const hashedPassword = await AuthHelper.hashPassword(dto.newPassword);

        const updatedUser = await this.userModel
            .findByIdAndUpdate(
                { _id: new Types.ObjectId(id) },
                { password: hashedPassword },
                { new: true, lean: true, select: '-password -resetCode' },
            )
            .exec();

        return updatedUser;
    }

    // async uploadAvatar(file: Express.Multer.File): Promise<{ avatar: string }> {
    //     if (NestHelper.getInstance().isEmpty(file)) {
    //         ExceptionHelper.getInstance().defaultError('File not found', 'file_not_found', HttpStatus.BAD_REQUEST);
    //     }

    //     try {
    //         // const s3Response = await S3Services.uploadFile(file);
    //         return { avatar: 'abc' };
    //     } catch (error) {
    //         this.logger.error('uploadAvatar Error uploading file: ', error);
    //         ExceptionHelper.getInstance().defaultError(
    //             'File upload failed',
    //             'file_upload_failed',
    //             HttpStatus.INTERNAL_SERVER_ERROR,
    //         );
    //     }
    // }

    // async removeAvatar(user: IUser): Promise<{ success: boolean; message: string }> {
    //     const userId = new Types.ObjectId(user.userId);

    //     const previousUser = await this.userModel.findByIdAndUpdate(
    //         userId,
    //         { $set: { avatar: null } },
    //         { new: false, projection: { avatar: 1 } },
    //     );

    //     if (!previousUser) {
    //         ExceptionHelper.getInstance().throwUserNotFoundException();
    //     }

    //     const previousAvatar = previousUser.avatar;

    //     if (!previousAvatar) {
    //         return { success: true, message: 'Avatar already removed or not set' };
    //     }

    //     const url = new URL(previousAvatar);
    //     const s3Key = url.pathname.slice(1);

    //     // const deleted = await S3Services.deleteFile(s3Key);

    //     // if (!deleted) {
    //     //     this.logger.warn(`S3 file deletion failed for key: ${s3Key}`);
    //     // }

    //     return { success: true, message: 'Avatar removed successfully' };
    // }

    async update(id: string, updateUser: UpdateUserDto, user: IUser): Promise<IUser> {
        const getUser = await this.getUser(id, user);

        if (getUser._id.toString() !== user.userId) {
            ExceptionHelper.getInstance().throwUserNotFoundException();
        }

        // if (getUser.address.addressLine !== updateUser.addressLine || getUser.address.zip !== updateUser.zip) {
        //     const addressId = new Types.ObjectId(`${getUser.address._id}`);
        //     await this.addressService.updateOrRemove(addressId, updateUser);
        // }

        // if (!updateUser.avatar) {
        //     await this.removeAvatar(user);
        // }

        await this.userModel.findByIdAndUpdate(
            { _id: new Types.ObjectId(id) },
            {
                name: updateUser.name,
                phone: updateUser.phone,
                receiveUpdate: updateUser.receiveUpdate,
                avatar: updateUser.avatar ?? null,
            },
            {
                new: true,
                lean: true,
            },
        );

        return await this.getUser(id, user);
    }

    async createUserSession(userSession: IUserSession): Promise<UserSession> {
        const sessionObj = ConstructObjectFromDto.constructUserSessionObject(userSession);
        const session = await this.userSessionModel.create(sessionObj);

        return session;
    }

    // async revokeUserSession(tokenId: string): Promise<void> {
    //     await this.userSessionModel.updateOne({ tokenId }, { isRevoked: true });
    // }

    async getActiveSessions(userId: string): Promise<UserSession[]> {
        return this.userSessionModel.find({ userId: new Types.ObjectId(userId), isRevoked: false }).exec();
    }

    async getActiveSessionByTokenId(tokenId: string): Promise<UserSession | null> {
        return this.userSessionModel.findOne({ tokenId, isRevoked: false }).lean().exec();
    }

    async getActiveSessionByJwt(jwt: string): Promise<UserSession | null> {
        return this.userSessionModel.findOne({ accessToken: jwt, isRevoked: false }).lean().exec();
    }

    // async getSessionById(sessionId: string): Promise<UserSession | null> {
    //     return this.userSessionModel.findById(sessionId).exec();
    // }
}
