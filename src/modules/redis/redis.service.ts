import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

    async set(key: string, value: any, ttl: number = 3600): Promise<void> {
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
