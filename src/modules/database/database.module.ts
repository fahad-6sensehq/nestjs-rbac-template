import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                uri: `${configService.getOrThrow('MONGODB_URL')}${configService.getOrThrow('ENVIRONMENT')}_${configService.getOrThrow('DB_NAME')}`,
            }),
        }),
    ],
})
export class DatabaseModule {}
