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

    static get redisHost(): string {
        return AppConfig.configService.getOrThrow('REDIS_HOST');
    }

    static get redisPort(): number {
        return AppConfig.configService.getOrThrow('REDIS_PORT');
    }

    static get redisUsername(): string {
        return AppConfig.configService.getOrThrow('REDIS_USERNAME');
    }

    static get redisPassword(): string {
        return AppConfig.configService.getOrThrow('REDIS_PASSWORD');
    }
}
