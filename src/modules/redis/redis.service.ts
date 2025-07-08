import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { AppConfig } from 'app.config';
import { Cache } from 'cache-manager';
import { checkServiceConnection } from 'common/utils/redisConnecting';

@Injectable()
export class RedisService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

    async onModuleInit() {
        try {
            await checkServiceConnection(AppConfig.redisHost, AppConfig.redisPort, 'Redis');
        } catch (err) {
            console.error('❌ Redis connection check failed during module init');
            throw err;
        }
    }

    async set(key: string, value: any, ttl: number = 60000): Promise<void> {
        await this.cacheManager.set(key, value, ttl);
    }

    async get<T = any>(key: string): Promise<T | undefined> {
        return await this.cacheManager.get<T>(key);
    }

    async del(key: string): Promise<void> {
        await this.cacheManager.del(key);
    }

    async deleteByPattern(pattern: string): Promise<void> {
        const store: any = (this.cacheManager as any).store;
        if (typeof store.keys !== 'function') {
            throw new Error('Current cache store does not support keys()');
        }

        const keys: string[] = await store.keys(pattern);
        await Promise.all(keys.map((key) => this.cacheManager.del(key)));
    }
}
