import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';

@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            // Redis connection string without credentials
            // useFactory: async (configService: ConfigService) => {
            //     return {
            //         stores: [
            //             createKeyv(
            //                 `redis://${configService.getOrThrow('REDIS_HOST')}:${configService.getOrThrow('REDIS_PORT')}`,
            //             ),
            //         ],
            //     };
            // },

            // Redis connection string with credentials
            useFactory: async (configService: ConfigService) => {
                const username = configService.get('REDIS_USERNAME');
                const password = configService.get('REDIS_PASSWORD');
                const host = configService.getOrThrow('REDIS_HOST');
                const port = configService.getOrThrow('REDIS_PORT');

                const credentials = username && password ? `${username}:${password}@` : '';
                const uri = `redis://${credentials}${host}:${port}`;

                return {
                    stores: [createKeyv(uri)],
                };
            },
        }),
    ],
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisModule {}
