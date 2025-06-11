import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConstructObjectFromDto } from 'common/instances/constructObjectFromDTO';
import { ExceptionHelper } from 'common/instances/ExceptionHelper';
import { RolePermissions } from 'common/rolePermissions';
import { RoleService } from 'modules/rbac/role/role.service';
import { CreateTenantDto } from 'modules/tenant/dtos/createTenant.dto';
import { Model } from 'mongoose';
import { Tenant, TenantDocument } from './entities/tenant.entity';

@Injectable()
export class TenantService {
    private readonly logger = new Logger(TenantService.name);
    constructor(
        @InjectModel(Tenant.name)
        private readonly tenantModel: Model<TenantDocument>,
        private readonly roleService: RoleService,
    ) {}

    async create(tenantDto: CreateTenantDto) {
        const tenantObj = ConstructObjectFromDto.constructCreateTenantObject(tenantDto);

        try {
            const rolePermissions = RolePermissions();

            if (rolePermissions.length === 0) {
                this.logger.error('role permissions not found');
                ExceptionHelper.getInstance().defaultError(
                    'role permissions not found',
                    'something went wrong',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const tenant = await this.tenantModel.create(tenantObj);
            for (const role of rolePermissions) {
                await this.roleService.createRolesAndAddPermission(role.name, role.permissions);
            }

            this.logger.log('tenant created, default role and permission created');

            return tenant;
        } catch (err) {
            this.logger.error('failed to create tenant');
            ExceptionHelper.getInstance().defaultError(err?.message, 'something went wrong', HttpStatus.BAD_REQUEST);
        }
    }

    async validateTenantCredentials(tenantId: string, tenantSecret: string) {
        try {
            const tenant = await this.tenantModel.findById(tenantId).lean();
            if (tenant && tenant?.secret === tenantSecret) {
                return tenant;
            }
        } catch {
            return null;
        }
    }

    async findAll() {
        return await this.tenantModel.find().lean();
    }

    async findOneById(id: string) {
        return await this.tenantModel.findById(id).lean();
    }

    async rolePermissions() {
        const rolePermissions = RolePermissions();

        if (rolePermissions.length === 0) {
            this.logger.error('role permissions not found');
            ExceptionHelper.getInstance().defaultError(
                'role permissions not found',
                'something went wrong',
                HttpStatus.BAD_REQUEST,
            );
        }

        for (const role of rolePermissions) {
            await this.roleService.createRolesAndAddPermission(role.name, role.permissions);
        }

        return { message: 'Role and permissions created' };
    }

    async warmup() {
        return { success: true };
    }
}
