import { ConfigService } from '@nestjs/config';

export class AppConfig {
    private static configService: ConfigService;

    static initialize(configService: ConfigService) {
        AppConfig.configService = configService;
    }

    static get port(): number {
        return 9000;
    }

    static get environment(): string {
        return AppConfig.configService.getOrThrow('ENVIRONMENT');
    }

    static get jwtSecret(): string {
        return AppConfig.configService.getOrThrow('JWT_SECRET');
    }
}
